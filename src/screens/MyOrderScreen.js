import {StyleSheet, Text, View, FlatList,Dimensions,SafeAreaView,Image,ScrollView, TouchableOpacity, Modal, Button, Animated} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Color, Fonts} from '../theme';
import { ProductImage, getData } from '../API';
import HistoryPlaceholder from '../placeholders/HistoryPlaceholder';
import { successToast } from '../components/toasts';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { useRef } from 'react';
import { color } from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
const MyOrderScreen = () => {
  const user = useSelector(state => state.user);
  const [userCart, setUserCart] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [myOrders, setMyOrders] = React.useState([]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [deliveryStatus, setDeliveryStatus] = React.useState('');
  const [selectedStep, setSelectedStep] = useState(0);
const progress1 = useRef(new Animated.Value(0)).current;
const progress2 = useRef(new Animated.Value(0)).current;
const progress3 = useRef(new Animated.Value(0)).current;


// const start1 = () => {
//   Animated.timing(progress1, {
//   toValue: 100,
//   duration: 3000,
//   useNativeDriver: false,
//   }).start();
//   };
//   const start2 = () => {
//   Animated.timing(progress2, {
//   toValue: 100,
//   duration: 3000,
//   useNativeDriver: false,
//   }).start();
//   };
//   const start3 = () => {
//   Animated.timing(progress3, {
//   toValue: 100,
//   duration: 3000,
//   useNativeDriver: false,
//   }).start();
//   };

  const toggleModal = (data) => {
    setModalVisible(!isModalVisible);
    setDeliveryStatus(data)
  };
   console.log('deliveryStatus',deliveryStatus); 

  const getUserOrders = async () => {
    setLoading(true);
    const res = await getData(`orderdata/${user?.user_id}`);
    console.log('HistData-->', res?.data);
    // if (res.status) {
      setMyOrders(res?.data);
      console.log('HistData-->', res?.data);
    // }
    // else{
    // errorToast('Something went wrong');
    // }
    setLoading(false);
  };

  const cancelOrder = async (id) => {   
    const res = await getData(`cancelorder/${id}`);
    console.log('CancelData-->', res,id);
     if(res?.status){
      successToast(res?.massage);
      getUserOrders();
     }
  };

   React.useEffect(() => {
    getUserOrders();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getUserOrders();
    }, [])
  );
  const orderStatusData = [
    { id: '1', status: 'Processing' },
    { id: '2', status: 'Shipped' },
    { id: '3', status: 'Out for Delivery' },
    { id: '4', status: 'Delivered' },
  ];
  const trackingData = [
    { id: '1', status: 'In Transit', location: 'City A', date: '2023-09-10' },
    { id: '2', status: 'In Transit', location: 'City B', date: '2023-09-11' },
    { id: '3', status: 'Delivered', location: 'City C', date: '2023-09-12' },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.productdetails}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>Order Details</Text>
            <Text style={styles.delivery_status_style}>{(item.order_status == 3 || item.order_status == 5 ) ? 'Delivered' : (item.order_status == 4 ? 'Cancelled' : 'Pending'  )}</Text>
          </View>

          <View style={styles.contentsection}>
            <View style={{}}>
              <Image
                source={{
                  uri: `${ProductImage + item.product_img}`,
                }}
                 resizeMode='contain'
                style={{width: 140, height: 100}}
              />
              <TouchableOpacity style={styles.order_btn_style} onPress={() => toggleModal(item.order_status)}>
          <Text style={styles.order_txt_style}>Order Status</Text>
          </TouchableOpacity>
            </View>

            <View style={styles.textsection}>
              <View>
                <Text style={styles.productname} numberOfLines={1}>
                  {item?.variant_name}
                </Text>
              </View>

              <View>
                <Text style={styles.description} numberOfLines={2}>
                  {item?.product_name}{' '}
                </Text>
              </View>

              <View style={styles.pricesection}>
                <Text style={styles.discount}>₹{item?.mrp}</Text>
                <Text style={styles.price}> {item?.unit_price}</Text>
                {/* <Text style={styles.disc}>{item?.commission_cent}% off</Text> */}
              </View>

              {(item.order_status == 0 || item.order_status == 1 || item.order_status == 2) && 
          <TouchableOpacity style={styles.cancel_btn_style} onPress={() => cancelOrder(item.id)}>
          <Text style={styles.cancel_txt_style}>Cancel</Text>
          </TouchableOpacity>
          }
            </View>
          </View>
      
        </View>
      </>
    );
  };

 

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
      <Text style={{...styles.heading,padding:20,fontSize:18}}>My Orders</Text>
      <View style={{}}>

      {loading ?
      <HistoryPlaceholder /> :
   
      <FlatList
        key={'flatlist'}
        data={myOrders}
        nestedScrollEnabled={true}
        keyExtractor={item => item.id}
        // renderItem={({item, index}) => renderCartItem(item, index)}
        renderItem={_renderItem}
        // extraData={this.state}
        // contentInset={{bottom: 150}}
        //contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
      />
      
    } 
      </View>
      <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.container}>
      <Text style={styles.header}>Order Status</Text>
      <View style={{flex: 1}}>
<View style={{width: '100%',alignItems:'flex-start',justifyContent:'center', paddingVertical: 50}}>
  <View style={{flexDirection:'row',}}>
          <View
          style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: deliveryStatus >= 0 ? 'green' : '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>1</Text>
          </View>
          <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:deliveryStatus >= 0 ? '#111' : '#f2f2f2'}}>Pending</Text>
          </View>
          <View
          style={{
          width: 3,
          height: 70,
          backgroundColor: deliveryStatus >= 1 ? 'green' : '#f2f2f2',
          marginLeft:13
          }}></View>
            <View style={{flexDirection:'row',}}>
          <View
          style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: deliveryStatus >= 1 ? 'green' : '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>2</Text>
          </View>
          <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:deliveryStatus >= 1 ? '#111' : '#f2f2f2'}}>Processing</Text>
          </View>
          <View
          style={{
          width: 3,
          height: 70,
          backgroundColor: deliveryStatus >= 2 ? 'green' : '#f2f2f2',
          marginLeft:13

          }}></View>
            <View style={{flexDirection:'row',}}>
          <View
          style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: deliveryStatus >= 2 ? 'green' : '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>3</Text>
          </View>
          <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:deliveryStatus >= 2 ? '#111' : '#f2f2f2'}}>Out ForDelivery</Text>
          </View>
          <View
          style={{
          width: 3,
          height: 70,
          backgroundColor: deliveryStatus == 3 || deliveryStatus == 5 ? 'green' : 
          deliveryStatus == 4 ? 'red' : 
          '#f2f2f2',
          marginLeft:13

          }}></View>
            <View style={{flexDirection:'row',}}>
          <View
          style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: deliveryStatus == 3 || deliveryStatus == 5 ? 'green' : 
          deliveryStatus == 4 ? 'red' : 
          '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>4</Text>
          </View>
          <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',
          color:deliveryStatus == 3 || deliveryStatus == 5 ? '#111' : 
          deliveryStatus == 4 ? 'red' : 
          '#f2f2f2'}}>{deliveryStatus == 4 ? 'Declined' : 'Delivered'}</Text>
          </View>

          <View
          style={{
          width: 3,
          height: 70,
          backgroundColor: deliveryStatus == 5 ? 'green' : '#f2f2f2',
          marginLeft:13
          }}></View>
          <View style={{flexDirection:'row',}}>
          <View
          style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: deliveryStatus == 5 ? 'green' : '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>5</Text>
          </View>
          <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',color:deliveryStatus == 5 ? '#111' : '#f2f2f2'}}>Completed</Text>
          </View>
          </View>


{/* 
<View
style={{
width: '100%',
alignItems: 'center',
padding: 50,
position: 'absolute',
top: 0,
}}>
<Animated.View
style={{
width: 6,
height: progress1,
marginTop: 30,
backgroundColor: 'green',
}}></Animated.View>

<Animated.View
style={{
width: 6,
height: progress2,
marginTop: 30,
backgroundColor: 'green',
}}></Animated.View>
<Animated.View
style={{
width: 6,
height: progress3,
marginTop: 30,
backgroundColor: 'green',
}}></Animated.View>
</View> */}



<TouchableOpacity
style={{
bottom: 0,
height: 50,
width: 200,
backgroundColor: Color.primary,
justifyContent: 'center',
alignItems: 'center',
borderRadius: 10,
alignSelf: 'center',
}}
onPress={ 
  toggleModal
// if (selectedStep == 0) {
// setSelectedStep(selectedStep + 1);
// } else {
// setTimeout(() => {
// setSelectedStep(selectedStep + 1);
// }, 3000);
// }

}>
<Text style={{color:'#111',fontSize:16,fontWeight:'bold'}}>Close</Text>
</TouchableOpacity>
</View>
        {/* <Button title="Close" onPress={toggleModal} /> */}
      </View>
    </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  statusLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'lightgray',
    marginLeft: 7,
    marginRight: 7,
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
  },
  statusDate: {
    fontSize: 14,
    color: 'gray',
  },




  main_container: {
    flex: 1,
   // backgroundColor: Color.white,
   
  },
  user: {
    paddingTop: 6,
    paddingLeft: 4,
  },

  summary: {
    color: '#000',
    fontSize: 13,
    paddingLeft: 10,
    top: -5,
  },
  Address: {
    backgroundColor: '#fff',
    width: width,
    height: 150,
    paddingRight: 14,
    paddingTop: 12,
  },
  product: {
    backgroundColor: '#fff',
    width: width,
    height: 150,
    paddingRight: 14,
    paddingTop: 12,
  },

  productdetails: {
    backgroundColor: '#fff',
    width: width,
    height: 220,
    paddingRight: 14,
    paddingTop: 12,
    marginTop: 5,
   
    paddingLeft: 12,
    paddingBottom:15
  },
  pricedetails: {
    backgroundColor: '#fff',
    width: width,
    // height: 170,
    // height:height/4,
    paddingRight: 14,
    paddingTop: 12,
    // marginTop: 5,
    paddingRight: 12,
    paddingLeft: 12,
  },
  topline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 12,
  },
  delivery_status_style:{
    fontFamily: Fonts.primarySemiBold,
    color: Color.primary,
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 12, 
  },
  change: {
    borderWidth: 1,
    borderColor: '#1be6db',
    padding: 3,
    borderRadius: 5,
  },
  contentsection: {
    display: 'flex',
    flexDirection: 'row',
  },
  textsection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // alignItems:'center'
  },
  productname: {
    fontFamily: Fonts.Questrial,
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  description: {
    color: '#95a5a6',
    fontSize: 12,
    width: 180,
    paddingLeft: 12,
  },
  pricesection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 12,
    width: 150,
  },
  price: {
    fontFamily: Fonts.primarySemiBold,
    color: '#2c3e50',
    fontSize: 18,
    // marginLeft: 10,
    fontWeight: 'bold',
    marginRight: 12,
  },
  discount: {
    color: '#e74c3c',
    textDecorationLine: 'line-through',
  },
  disc: {
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    padding: 5,
  },
  pricelist: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  pricing: {
    width: width - 18,
    paddingRight: 16,
    paddingLeft: 10,
  },
  box2: {
    width: width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#1be6db',
    display: 'flex',
    // flex: 1,
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#1be6db',
    color: '#000',
  },
  checkout_container: {
    textAlign: 'center',
    height: 50,
    backgroundColor: '#000',
    // color:"#fff",
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  payment_method_box:{
    backgroundColor: '#fff',
    width: width,
    height: 170,
    paddingRight: 14,
    paddingTop: 12,
    marginTop: -395,
    paddingRight: 12,
    paddingLeft: 12,

  },
  cancel_btn_style:{
    backgroundColor:Color.primary,
    //alignSelf:'center',
    padding:10,
    borderRadius:8,
    marginTop:10,
   // width:'50%'
  },
  cancel_txt_style:{
    fontFamily:Fonts.primarySemiBold,
    color:Color.white,
    fontSize:15,
    textAlign:'center'
  },
  order_btn_style:{
    backgroundColor:Color.white,
    //alignSelf:'center',
    padding:5,
    borderRadius:8,
    marginTop:10,
   // width:'50%'
  },
  order_txt_style:{
    fontFamily:Fonts.primarySemiBold,
    color:Color.primary,
    fontSize:15,
    textAlign:'center'
  }
});
