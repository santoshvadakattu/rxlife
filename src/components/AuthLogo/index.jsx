import {View, Image} from 'react-native';
import React from 'react';
import {Images} from '../../theme';
import styles from './styles';

const AuthLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.Logo} style={styles.logo} />
    </View>
  );
};

export default AuthLogo;
