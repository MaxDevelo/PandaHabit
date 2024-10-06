import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Dimensions, Image } from "react-native";
import { getPathDown } from "../utils/curve";
import { Svg, Path } from "react-native-svg";
import { scale } from "react-native-size-scaling";
import CalendarSchedule from "../components/Calendar/CalendarSchedule";

const Tab = createBottomTabNavigator();
export default function BottomTabNav() {
    const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
    const returnpathDown = getPathDown(maxWidth, 60, 50);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    position: "absolute",
                    elevation: 0,
                },
            }}
        >
            <Tab.Screen
                name="Profile"
                component={CalendarSchedule}
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        margin: 0,
                        backgroundColor: "white",
                    },
                    tabBarIcon: () => (
                        <Image
                            style={{
                                width: 36,
                                height: 36,
                            }}
                            source={{
                                uri: "https://img.icons8.com/?size=100&id=Gc9qmZNN9yFN&format=png&color=000000",
                            }}
                        />
                    ),
                    tabBarLabel: () => (
                        <Text className="text-black text-xs"></Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Stats"
                component={CalendarSchedule}
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        margin: 0,
                        backgroundColor: "white",
                    },
                    tabBarIcon: () => (
                        <Image
                            style={{
                                width: 36,
                                height: 36,
                            }}
                            source={{
                                uri: "https://img.icons8.com/?size=100&id=rjMOGEY1NKlC&format=png&color=000000",
                            }}
                        />
                    ),
                    tabBarLabel: () => (
                        <Text className="text-black text-xs"></Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={CalendarSchedule}
                options={{
                    headerShown: false,
                    unmountOnBlur: false,
                    tabBarItemStyle: {
                        margin: 0,
                        zIndex: -50,
                    },
                    tabBarIcon: () => (
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 56,
                                width: 56,
                                backgroundColor: "white",
                                borderRadius: 35,
                            }}
                        >
                            <Image
                                style={{
                                    width: 66,
                                    height: 66,
                                }}
                                source={{
                                    uri: "https://img.icons8.com/?size=100&id=102544&format=png&color=000000",
                                }}
                            />
                        </View>
                    ),
                    tabBarLabel: () => (
                        <View>
                            <Svg width={maxWidth} height={scale(60)}>
                                <Path fill={"white"} {...{ d: returnpathDown }} />
                            </Svg>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Habits"
                component={CalendarSchedule}
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        margin: 0,
                        backgroundColor: "white",
                    },
                    tabBarIcon: () => (
                        <Image
                            style={{
                                width: 36,
                                height: 36,
                            }}
                            source={{
                                uri: "https://img.icons8.com/?size=100&id=T1AInUJb5ET3&format=png&color=000000",
                            }}
                        />
                    ),
                    tabBarLabel: () => (
                        <Text className="text-black text-xs"></Text>
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileSetting"
                component={CalendarSchedule}
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        margin: 0,
                        backgroundColor: "white",
                    },
                    tabBarIcon: () => (
                        <Image
                            style={{
                                width: 36,
                                height: 36,
                            }}
                            source={{
                                uri: "https://img.icons8.com/?size=100&id=364&format=png&color=000000",
                            }}
                        />
                    ),
                    tabBarLabel: () => (
                        <Text className="text-black text-xs"></Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};