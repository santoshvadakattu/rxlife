import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(13, 130, 255, 0.1)',
    height: 110,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 15,
    paddingTop: 0,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13, 130, 255, 0.1)',
    borderTopLeftRadius: 6,
  },
  titleIconView: {
    paddingLeft: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    marginLeft: 5,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 29,
    borderBottomWidth: 29,
    borderLeftColor: 'rgba(255,255,255,0.7)',
    borderBottomColor: Colors.background.primary,
    transform: [{rotate: '90deg'}],
  },
});

export default styles;
