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
import com.facebook.react.bridge.WritableMap;
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
        reactContext.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "BeaconManger";
    }

    @ReactMethod
    public void beaconInitialize(Callback callback){

        beaconManager = BeaconManager.getInstanceForApplication(getReactApplicationContext());
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19"));
        beaconManager.bind(this);
        Log.e("Suc", "coarse location permission granted previously");

        callback.invoke(BeaconEvent.BEACON_MANAGER_INIT);

    }

    @ReactMethod
    @Override
    public void onBeaconServiceConnect() {
        emitEvent(BeaconEvent.SERVICE_ENTER);
        beaconManager.removeAllRangeNotifiers();
        beaconManager.removeAllMonitorNotifiers();
        beaconManager.addMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                Log.e("BEACON:", "I just saw an beacon for the first time!");
                emitEvent(BeaconEvent.ENTER_REGION);
            }

            @Override
            public void didExitRegion(Region region) {
                Log.e("BEACON:","I no longer see an beacon");
                emitEvent(BeaconEvent.EXIT_REGION);
            }

            @Override
            public void didDetermineStateForRegion(int state, Region region) {
                Log.e("BEACON:","I have just switched from seeing/not seeing beacons: "+state);
                emitEvent(BeaconEvent.SWITCH_STATE_REGION,String.valueOf(state));
            }
        });

        beaconManager.addRangeNotifier(new RangeNotifier() {

            @Override
            public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                if (beacons.size() > 0) {
                    Log.e("BEACON:","The first beacon I see is about "+beacons.iterator().next().getDistance()+" meters away.");
                    String json = new Gson().toJson(beacons);
                    emitEvent(BeaconEvent.BEACONS_IN_REGION,json);
                }
            }
        });

        try {
            beaconManager.startRangingBeaconsInRegion(new Region("myRangingUniqueId", null, null, null));
        } catch (RemoteException e) {    }
    }

    @Override
    public Context getApplicationContext() {
        return getReactApplicationContext().getApplicationContext();
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {
        getApplicationContext().unbindService(serviceConnection);
    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return getApplicationContext().bindService(intent,serviceConnection,i);
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        beaconManager.unbind(this);
    }

    private void emitEvent(BeaconEvent event){
        emitEvent(event,"");
    }

    private void emitEvent(BeaconEvent event,String message){
        WritableMap params = Arguments.createMap();
        params.putString("event",event.toString());
        params.putString("message",message);

        emitEvent(getReactApplicationContext(),event,params);
    }

    private void emitEvent(ReactContext reactContext,BeaconEvent event,@Nullable WritableMap params){
        if(reactContext != null){
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("beaconService",params);
        }else{
            Log.e("EmitEvent:","Null react context");
        }
    }
}
