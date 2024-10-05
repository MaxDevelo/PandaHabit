import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroduceScreen from "../screens/Intro/IntroduceScreen";

const Stack = createNativeStackNavigator();

export default function IntroduceNavigation() {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Introduce" component={IntroduceScreen} />
            </Stack.Navigator>
        </>
    );
}