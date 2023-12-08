import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Color,Fonts } from '../theme';
import Stepper from 'react-native-stepper-ui';

const MyComponent = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const content = [
  <MyComponent title="Order Summary" />,
  <MyComponent title="Address" />,
  <MyComponent title="Payment Gateway" />,
];

const Stepperdown = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={{ marginVertical:10, marginHorizontal: 20 }}>
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => alert('Finish')}
        onNext={() => setActive((p) => p + 1)}
        showButton={false}
        stepTextStyle={{color:'#000'}}
        stepStyle={{backgroundColor:Color.primary, width:40, height:40, borderRadius: 30, justifyContent: 'center', alignItems: 'center', opacity: 1}}
      />
    </View>
  );
};

export default Stepperdown;

// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
// const Stepperdown = () => {
//   const [isValid,setIsValid] = (false) ;
//   const [errors,setErrors] = (false) ;

// const onNextStep = () => {
//   if (!this.state.isValid) {
//    setErrors(true)
//   } else {
//     setErrors(false)
//   }
// };

// const onPaymentStepComplete = () => {
//   alert('Payment step completed!');
// };

// const onPrevStep = () => {
//   console.log('called previous step');
// };

// const onSubmitSteps = () => {
//   console.log('called on submit step.');
// };

// const progressStepsStyle = {
//   activeStepIconBorderColor: '#686868',
//   activeLabelColor: '#686868',
//   activeStepNumColor: 'white',
//   activeStepIconColor: '#686868',
//   completedStepIconColor: '#686868',
//   completedProgressBarColor: '#686868',
//   completedCheckColor: '#4bb543'
// };

// const buttonTextStyle = {
//   color: '#686868',
//   fontWeight: 'bold'
// };


//   return (
   
//       <View style={{ flex: 1, marginTop: 50 }}>
//         <ProgressSteps>
//           <ProgressStep
//             label="Payment"
//             onNext={onPaymentStepComplete}
//             onPrevious={onPrevStep}
//             scrollViewProps={defaultScrollViewProps}
//           >
//             <View style={{ alignItems: 'center' }}>
//               <Text>Payment step content</Text>
//             </View>
//           </ProgressStep>
//           <ProgressStep
//             label="Shipping Address"
//             onNext={onNextStep}
//             onPrevious={onPrevStep}
//             scrollViewProps={defaultScrollViewProps}
//           >
//             <View style={{ alignItems: 'center' }}>
//               <Text>Shipping address step content</Text>
//             </View>
//           </ProgressStep>
//           <ProgressStep
//             label="Billing Address"
//             onNext={onNextStep}
//             onPrevious={onPrevStep}
//             scrollViewProps={defaultScrollViewProps}
//           >
//             <View style={{ alignItems: 'center' }}>
//               <Text>Billing address step content</Text>
//             </View>
//           </ProgressStep>
//           <ProgressStep
//             label="Confirm Order"
//             onPrevious={onPrevStep}
//             onSubmit={onSubmitSteps}
//             scrollViewProps={defaultScrollViewProps}
//           >
//             <View style={{ alignItems: 'center' }}>
//               <Text>Confirm order step content</Text>
//             </View>
//           </ProgressStep>
//         </ProgressSteps>
//       </View>
//   )
// }

// export default Stepperdown;

const styles = StyleSheet.create({})

// import React from "react";
// import { Text, View } from "react-native";
// import {createProcess, useProcess} from 'react-native-step-by-step-process';

// const Process = createProcess();

// const Stepperdown = () => {
//   const {currentStep, activeStep} = useProcess();

//   const onPressNextInStep = (nextStepIndex) => {
//     if(nextStepIndex === 2){
//         return true; // This will prevent the next step from being rendered
//     }
//   }

//   return (
   
//       <Process.ProcessFlow
//         activeStepIconColor={'#60a4ac'}
//         labelStyle={{color: '#60a4ac'}}
//         nextBtnStyle={{backgroundColor: '#60a4ac'}}
//         nextBtnTextStyle={{color: 'black'}}
//         previousBtnStyle={{backgroundColor: '#60a4ac'}}
//         previousBtnTextStyle={{color: 'black'}}
//         nextBtnText={'txtProceed'}
//         previousBtnText={'back'}
//         onNext={onPressNextInStep}>
//         <Process.Step
//             label={'txtFillStepDate'}
//             showFirstStepPreviousButton={true}>
//             <View style={{ alignItems: 'center' }}>
//                 <Text>Step 1!</Text>
//             </View>
//         </Process.Step>
//         <Process.Step
//             label={'txtFillStepDate'}
//             showFirstStepPreviousButton={true}>
//             <View style={{ alignItems: 'center' }}>
//                 <Text>Step 2!</Text>
//             </View>
//         </Process.Step>
//         <Process.Step
//             label={'txtFillStepDate'}
//             showFirstStepPreviousButton={true}>
//             <View style={{ alignItems: 'center' }}>
//                 <Text>Step 3!</Text>
//             </View>
//         </Process.Step>
//         <Process.Step
//             label={'txtFillStepDate'}
//             showFirstStepPreviousButton={true}>
//             <View style={{ alignItems: 'center' }}>
//                 <Text>Step 4!</Text>
//             </View>
//         </Process.Step>
//       </Process.ProcessFlow>
      
//   );
// };

// export default Stepperdown;
