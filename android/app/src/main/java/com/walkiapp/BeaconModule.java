package com.walkiapp;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.RemoteException;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;

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

public class BeaconModule extends ReactContextBaseJavaModule implements BeaconConsumer, LifecycleEventListener {

    private static final String LOG_TAG = "BeaconManger";
    private BeaconManager beaconManager;
    private Context mApplicationContext;
    private ReactApplicationContext mReactContext;
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
        Log.d(LOG_TAG, "BeaconsModule - started");
        this.mReactContext = reactContext;
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public void initialize() {
        super.initialize();
        this.mApplicationContext = this.mReactContext.getApplicationContext();
        beaconManager = BeaconManager.getInstanceForApplication(mApplicationContext);
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19"));
        bindManager();
        Log.e(LOG_TAG, BeaconEvent.BEACON_MANAGER_INIT.toString());
        emitEvent(BeaconEvent.BEACON_MANAGER_INIT);
    }

    @NonNull
    @Override
    public String getName() {
        return LOG_TAG;
    }

    @ReactMethod
    @Override
    public void onBeaconServiceConnect() {
        Log.e(LOG_TAG, "onBeaconServiceConnect");
        emitEvent(BeaconEvent.SERVICE_ENTER);
        beaconManager.removeAllRangeNotifiers();
        beaconManager.removeAllMonitorNotifiers();
        beaconManager.addMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                Log.e(LOG_TAG, "Beacon detected in region");
                emitEvent(BeaconEvent.ENTER_REGION,createMonitoringResponse(region));
            }

            @Override
            public void didExitRegion(Region region) {
                Log.e(LOG_TAG,"Beacon is no longer detected in region");
                emitEvent(BeaconEvent.EXIT_REGION,createMonitoringResponse(region));
            }

            @Override
            public void didDetermineStateForRegion(int state, Region region) {
                Log.e(LOG_TAG,"Beacon switch state: "+state);
                emitEvent(BeaconEvent.SWITCH_STATE_REGION,createMonitoringResponse(region));
            }
        });

        beaconManager.addRangeNotifier(new RangeNotifier() {

            @Override
            public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                if (beacons.size() > 0) {
                    Log.e(LOG_TAG,"The first beacon I see is about "+beacons.iterator().next().getDistance()+" meters away.");
                    String json = new Gson().toJson(beacons);
                    emitEvent(BeaconEvent.BEACONS_IN_REGION,json);
                }
            }
        });

        try {
            beaconManager.startRangingBeaconsInRegion(new Region("myRangingUniqueId", null, null, null));
        } catch (RemoteException e) {    }
    }

    public void bindManager() {
        if (!beaconManager.isBound(this)) {
            Log.d(LOG_TAG, "bindManager");
            beaconManager.bind(this);
        }
    }

    public void unbindManager() {
        if (beaconManager.isBound(this)) {
            Log.d(LOG_TAG, "unbindManager");
            beaconManager.unbind(this);
        }
    }

    private WritableMap createMonitoringResponse(Region region) {
        WritableMap map = new WritableNativeMap();
        map.putString("identifier", region.getUniqueId());
        map.putString("uuid", region.getId1() != null ? region.getId1().toString() : "");
        map.putInt("major", region.getId2() != null ? region.getId2().toInt() : 0);
        map.putInt("minor", region.getId3() != null ? region.getId3().toInt() : 0);
        return map;
    }

    /*-------------------------------------------------------
     * Context service
     * -------------------------------------------------------*/
    @Override
    public Context getApplicationContext() {
        return mApplicationContext;
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {
        mApplicationContext.unbindService(serviceConnection);
    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return mApplicationContext.bindService(intent,serviceConnection,i);
    }

    /*-------------------------------------------------------
    * Module lifecycle
    * -------------------------------------------------------*/
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

    /*-------------------------------------------------------
     * Emitter events
     * -------------------------------------------------------*/
    private void emitEvent(BeaconEvent event){
        emitEvent(event,"");
    }

    private void emitEvent(BeaconEvent event,String message){
        WritableMap params = Arguments.createMap();
        params.putString("event",event.toString());
        params.putString("message",message);

        emitEvent(mReactContext,params);
    }

    private void emitEvent(BeaconEvent event,@NonNull WritableMap params){
        WritableMap payload = Arguments.createMap();
        payload.putString("event",event.toString());
        payload.putString("message",params.toString());

        emitEvent(mReactContext,payload);
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
