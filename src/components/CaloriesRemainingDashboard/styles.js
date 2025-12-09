const {StyleSheet} = require('react-native');
const {Colors} = require('../../theme');

export default StyleSheet.create({
  mainView: {
    height: 230,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginTop: 20,
  },
});
