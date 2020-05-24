package com.walkiapp;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.RemoteException;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;

import java.util.Collection;

import javax.annotation.Nullable;

import androidx.annotation.NonNull;

public class BeaconModule extends ReactContextBaseJavaModule implements LifecycleEventListener, BeaconConsumer {

    private static final String LOG_TAG = "BeaconModule";
    private Context context;
    private ReactContext reactContext;
    private BeaconManager beaconManager;
    private enum BeaconEvent {
        BEACON_MANAGER_INIT("BEACON_MANAGER_INIT"),
        SERVICE_ENTER("SERVICE_ENTER"),
        ENTER_REGION("ENTER_REGION"),
        EXIT_REGION("EXIT_REGION"),
        SWITCH_STATE_REGION("SWITCH_STATE_REGION"),
        BEACONS_IN_REGION("BEACONS_IN_REGION"),
        START_NEW_RANGING_REGION("START_NEW_RANGING_REGION");

        private final String _type;

        BeaconEvent(String type) {
            _type = type;
        }

        @Override
        public String toString() {
            return _type;
        }
    }


    public BeaconModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addLifecycleEventListener(this);
    }

    @Override
    public void initialize() {
        super.initialize();
        this.context = this.reactContext.getApplicationContext();
    }

    @NonNull
    @Override
    public String getName() {
        return LOG_TAG;
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        unbindManager();
    }

    @ReactMethod
    public void beaconInit(Callback resolve,Callback reject){
        try{
            beaconManager = BeaconManager.getInstanceForApplication(this.context);
            beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19"));
            bindManager();
            resolve.invoke("Beacon Bind");
        }catch (Exception ex){
            reject.invoke(ex.getMessage());
        }
    }

    private void bindManager() {
        if (!beaconManager.isBound(this)) {
            Log.d(LOG_TAG, "bindManager");
            beaconManager.bind(this);
        }
    }

    private void unbindManager() {
        if (beaconManager.isBound(this)) {
            Log.d(LOG_TAG, "unbindManager");
            beaconManager.unbind(this);
        }
    }

    @Override
    public void onBeaconServiceConnect() {
        emitEvent(BeaconEvent.SERVICE_ENTER);
        beaconManager.removeAllMonitorNotifiers();
        beaconManager.addMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                Log.i(LOG_TAG, "I just saw an beacon for the first time!");
                emitEvent(BeaconEvent.ENTER_REGION);
            }

            @Override
            public void didExitRegion(Region region) {
                Log.i(LOG_TAG, "I no longer see an beacon");
                emitEvent(BeaconEvent.EXIT_REGION);
            }

            @Override
            public void didDetermineStateForRegion(int state, Region region) {
                Log.i(LOG_TAG, "I have just switched from seeing/not seeing beacons: "+state);
                emitEvent(BeaconEvent.SWITCH_STATE_REGION);
            }
        });

        try {
            beaconManager.startMonitoringBeaconsInRegion(new Region("myMonitoringUniqueId", null, null, null));
        } catch (RemoteException e) {    }

        beaconManager.removeAllRangeNotifiers();
        beaconManager.addRangeNotifier(new RangeNotifier() {
            @Override
            public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                if (beacons.size() > 0) {
                    Log.i(LOG_TAG, "The first beacon I see is about "+beacons.iterator().next().getDistance()+" meters away.");
                    emitEvent(BeaconEvent.BEACONS_IN_REGION,createRangingResponse(beacons,region));
                }
            }
        });

        try {
            beaconManager.startRangingBeaconsInRegion(new Region("myRangingUniqueId", null, null, null));
        } catch (RemoteException e) {    }
    }

    private WritableMap createRangingResponse(Collection<Beacon> beacons, Region region) {
        WritableMap map = new WritableNativeMap();
        map.putString("identifier", region.getUniqueId());
        map.putString("uuid", region.getId1() != null ? region.getId1().toString() : "");
        WritableArray a = new WritableNativeArray();
        for (Beacon beacon : beacons) {
            WritableMap b = new WritableNativeMap();
            b.putString("uuid", beacon.getId1().toString());
            /*if (beacon.getIdentifiers().size() > 2) {
                b.putInt("major", beacon.getId2().toInt());
                b.putInt("minor", beacon.getId3().toInt());
            }*/
            b.putInt("rssi", beacon.getRssi());
            if(beacon.getDistance() == Double.POSITIVE_INFINITY
                    || Double.isNaN(beacon.getDistance())
                    || beacon.getDistance() == Double.NaN
                    || beacon.getDistance() == Double.NEGATIVE_INFINITY){
                b.putDouble("distance", 999.0);
                b.putString("proximity", "far");
            }else {
                b.putDouble("distance", beacon.getDistance());
                b.putString("proximity", getProximity(beacon.getDistance()));
            }
            a.pushMap(b);
        }
        map.putArray("beacons", a);
        return map;
    }

    private String getProximity(double distance) {
        if (distance == -1.0) {
            return "unknown";
        } else if (distance < 1) {
            return "immediate";
        } else if (distance < 3) {
            return "near";
        } else {
            return "far";
        }
    }

    @Override
    public Context getApplicationContext() {
        return this.context;
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {
        getApplicationContext().unbindService(serviceConnection);
    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return getApplicationContext().bindService(intent,serviceConnection,i);
    }

    /*-------------------------------------------------------
     * Emitter events
     * -------------------------------------------------------*/
    private void emitEvent(BeaconEvent event){
        emitEvent(event,"");
    }

    private void emitEvent(BeaconEvent event,String message){
        WritableMap params = Arguments.createMap();
        params.putString("event",event.toString());
        params.putString("data",message);

        emitEvent(this.reactContext,params);
    }

    private void emitEvent(BeaconEvent event,@NonNull WritableMap params){
        WritableMap payload = Arguments.createMap();
        payload.putString("event",event.toString());
        payload.putString("data",params.toString());

        emitEvent(this.reactContext,payload);
    }

    private void emitEvent(ReactContext reactContext,@Nullable WritableMap params){
        if(reactContext != null){
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("beaconService",params);
        }else{
            Log.e("EmitEvent:","Null react context");
        }
    }

}
