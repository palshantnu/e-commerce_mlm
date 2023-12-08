import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

export default function CartPlaceholder() {
  return (
    <View
      style={{
        marginBottom: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
      }}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          width={width - 20}
          alignSelf="center"
          marginTop={10}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={150}
            borderRadius={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={width - 20}
          alignSelf="center"
          marginTop={10}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={150}
            borderRadius={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={width - 20}
          alignSelf="center"
          marginTop={10}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={150}
            borderRadius={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={width - 20}
          alignSelf="center"
          marginTop={10}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={150}
            borderRadius={15}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
