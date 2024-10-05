import React, { useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function IntroduceScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState([
    {
        image: require("../../assets/Pages/Introduce/Cute_Panda_Riding_Bamboo_1.png"),
        title: "Simple Tracking",
        description: "Track your habits effortlessly. Our intuitive interface makes it easy to monitor your progress and stay on top of your goals."
    },
    {
        image: require("../../assets/Pages/Introduce/Cute_Panda_Lifting_Big_Bamboo_1.png"),
        title: "Seamless Connectivity",
        description: "Stay connected with your habits. Our app allows you to sync data across devices and access your progress anytime, anywhere."
    },
    {
        image: require("../../assets/Pages/Introduce/Cute_Panda_Meditating_With_Bamboo_1.png"),
        title: "Effortless Management",
        description: "Manage your habits with ease. Our app provides tools and reminders to help you stay focused and committed."
    }
]);
  const nextStep = () => {
    setCurrentStep(currentStep >= 2 ? 2 : currentStep+1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep <= 0 ? 0 : currentStep-1)
  }
  return (
    <View style={styles.container}>
      <Image source={steps[currentStep].image} style={styles.stepImage} resizeMode="contain"/>
      <View style={styles.stepIndicatorView}>
        {steps.map((step, index) => {
          return (
            <View key={index} style={{...styles.stepIndicator, 
              width: currentStep === index ? 40 : 30,
              backgroundColor:  currentStep === index ? "#fc79b7" : "gray"
            }}></View>
          )
        })}
      </View>
      <Text style={styles.title}>{steps[currentStep].title}</Text>
      <Text style={styles.description}>{steps[currentStep].description}</Text>
      <View style={styles.navigationView}>
        {
          currentStep > 0 ? 
            <TouchableOpacity 
              onPress={() => prevStep()}
              style={{...styles.navigationBtn, borderTopEndRadius: 20, borderBottomEndRadius:20,}}>
              <Text style={styles.navigationBtnTxt}>Back</Text>
            </TouchableOpacity>
            :
            <View></View>
        }
        
        <TouchableOpacity 
          onPress={() => nextStep()}
          style={{...styles.navigationBtn, borderTopStartRadius: 20, borderBottomStartRadius:20}}>
          <Text style={styles.navigationBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepImage: {
    width: "100%",
    height: 300,
    marginVertical: 30
  },
  stepIndicatorView: {
    flexDirection: "row"
  },
  stepIndicator: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 20,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 10
  },
  navigationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navigationBtn: {
    backgroundColor: "#fc79b7",
    height: 40,
    width: 100,
    justifyContent:"center",
    alignItems:"center"
  },
  navigationBtnTxt: {
    color: "white",
    fontWeight: "bold"
  }

});

