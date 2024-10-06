import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroduceScreen from "../screens/Intro/IntroduceScreen";
import DashboardScreen from "../screens/DashboardScreen";
import BottomTabNav from "./BottomTabNav";

const Stack = createNativeStackNavigator();

export default function IntroduceNavigation() {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
                <Stack.Screen name="Introduce" component={IntroduceScreen} />
                <Stack.Screen name="BottomTab" component={BottomTabNav} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Stack.Navigator>
        </>
    );
}