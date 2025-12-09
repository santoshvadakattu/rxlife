import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewStyle: {
    minHeight: 57,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'rgba(55, 55, 55, 0.1)',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    flex: 1,
  },
  dropDownImage: {
    width: 24,
    height: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dropDownView: {
    // position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    top: 10,
    maxHeight: 200,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderColor: 'rgba(55, 55, 55, 0.1)',
    borderWidth: 1,
    paddingBottom: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
    zIndex: 1,
    // flex: 1,
  },
});

export default styles;
