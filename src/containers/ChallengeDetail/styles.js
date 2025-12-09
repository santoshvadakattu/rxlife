import {Dimensions, StyleSheet, Platform} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 10,
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  viewSelected: {
    // width: Dimensions.get('screen').width - 30,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(55, 55, 55, .05)',
    flexDirection: 'row',
    marginTop: 15,
    flex: 1,
  },
  selectionView: {
    flex: 0.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {fontSize: 14, fontWeight: '500'},
  button: {
    backgroundColor: Colors.background.primary,
    alignSelf: 'center',
    width: 200,
    marginTop: 10,
    borderRadius: 10,
  },

  descContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    shadowColor: 'rgba(10, 23, 35, 0.05)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 8, // Adjust the elevation as needed
  },

  leaderBoard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },

  leaderBoardHeader: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 25,
    width: '100%',
  },

  crossWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 7,
  },

  cross: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },

  challengeComplete: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    // width: '95%',
    resizeMode: 'contain',
    height: 270,
    width: 300,
    marginTop: 15,
    borderRadius: 12,
    marginHorizontal: 25,
  },
  btnstyle: {
    height: 47,
    padding: 0,
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 15,
    width: '92%',
    alignSelf: 'center',
  },

  dailyChallengeContainer: {
    backgroundColor: Colors.background.darkBlue,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },

  dailyChallengeVideoIconContainer: {
    height: 37,
    width: 37,
    borderRadius: 6,
    backgroundColor: Colors.background?.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dailyChallengeTitleContainer: {
    marginLeft: 20,
  },

  modalWrapper2: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    // padding: 25,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    position: 'relative',
  },
});
