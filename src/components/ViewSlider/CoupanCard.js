import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

const CoupanCard = (props) => {
  const cdata = props.data;

  console.log('coupandata', cdata);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mainline}>{cdata.coupan_code}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.Amt}>₹{cdata.minimum_amt}</Text>

        <Text style={styles.summary}>
          Get Coupan on Purchase of Minimum Order Amount of
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: 280,
    height: 120,
    alignItem: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
      marginLeft: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 12,
    justifyContent: 'space-between',
    margin: 2,
    marginRight: 16,
    paddingLeft: 16,
  },
  Amt: {
    color: '#95a5a6',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mainline: {
    color: '#2c3e50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 3,
  },
  Summary: {
    color: '#7f8c8d',
    fontSize: 12,
  },
});

export default CoupanCard;
