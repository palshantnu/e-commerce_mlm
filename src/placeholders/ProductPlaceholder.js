import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

export default function ProductPlaceholder() {
  return (
    <View
      style={{
        marginBottom: 15,
        paddingHorizontal:20,
        alignSelf:'center'
      }}>
      <SkeletonPlaceholder borderRadius={4} >
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="space-between" width={width-20} alignSelf="center" marginTop={10}>
          <SkeletonPlaceholder.Item width={150} height={150} borderRadius={15} />
          <SkeletonPlaceholder.Item width={150} height={150} borderRadius={15} />
          </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="space-between"  width={width-20} alignSelf="center" marginTop={10}>
        <SkeletonPlaceholder.Item width={150} height={150} borderRadius={15} />
        <SkeletonPlaceholder.Item width={150} height={150} borderRadius={15} />
          
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="space-between"  width={width-20} alignSelf="center" marginTop={10}>
        <SkeletonPlaceholder.Item width={150} height={150} borderRadius={15} />
        <SkeletonPlaceholder.Item width={150} height={150} borderRadius={15} />
          
        </SkeletonPlaceholder.Item>
      
      </SkeletonPlaceholder>
    </View>
  );
}
