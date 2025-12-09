import {View} from 'react-native';
import React from 'react';

const DisplayBottom = ({children}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        flex: 1,
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}>
      {children}
    </View>
  );
};

export default DisplayBottom;
