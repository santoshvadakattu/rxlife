// @flow
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import VideoPlayerControls from 'react-native-video-controls';
import {Images} from '../../theme';
import styles from './styles';

const noop = () => {};
class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isMounted: false,
      isLoading: true,
      shouldPlayVideo: true,
      paused: false,
      resizeMode: 'cover',
      videoView: {},
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  render() {
    const {videoLink, onClose = () => {}, shouldPlayVideo} = this.props;
    const {paused} = this.state;

    const isPaused = shouldPlayVideo ? (paused ? true : false) : true;
    return (
      <View style={styles.container}>
        <VideoPlayerControls
          // navigator={Navigator}
          paused={isPaused}
          ref={(videoPlayer) => (this.myRef = videoPlayer?.player?.ref)}
          resizeMode="contain"
          source={videoLink ? {uri: videoLink} : Images.ChallengeVideo}
          volume={10.0}
          disableVolume
          ignoreSilentSwitch={'ignore'}
          onLoadStart={() =>
            this.setState({
              isLoading: isPaused ? false : true,
            })
          }
          showOnStart={shouldPlayVideo}
          onLoad={(data) => {
            this.setState({
              isLoading: false,
              duration: data?.duration ?? 0,
            });

            if (isPaused) {
              this.myRef?.seek?.(0);
            }
          }}
          onBack={() => {
            onClose();
          }}
        />
      </View>
    );
  }

  // render() {
  //   const {
  //     item,
  //     shouldPlayVideo,
  //     videoLink,
  //     paused = false,
  //     videoView,
  //     resizeMode = 'contain',
  //   } = this.props;

  //   const {isMounted} = this.state;
  //   const {uri, thumbnail} = item || {};

  //   const shouldPause = !this.state.isVisible || !shouldPlayVideo;
  //   return (
  //     <View style={[AppStyles.flex]}>
  //       <InViewPort
  //         delay={150}
  //         onChange={(isVisible) => {
  //           if (this.state.isVisible !== isVisible && !!isMounted) {
  //             this.setState({isVisible: isVisible});
  //           }
  //         }}
  //         style={[AppStyles.flex, styles.container]}>
  //         <View>
  //           <Video
  //             source={videoLink ? {uri: videoLink} : Images.ChallengeVideo}
  //             ref={(ref) => {
  //               this.myRef = ref;
  //             }}
  //             cacheName={`rxlife_video_${Math.random(10)}`}
  //             playInBackground={false}
  //             paused={paused}
  //             posterResizeMode="cover"
  //             playWhenInactive={true}
  //             resizeMode={resizeMode}
  //             repeat={false}
  //             disableFocus={false}
  //             ignoreSilentSwitch={'ignore'}
  //             // poster={Images.Video}
  //             controls={false}
  //             fullscreen={true}
  //             maxBitRate={2000}
  //             onLoadStart={() =>
  //               this.setState({
  //                 isLoading: paused ? false : true,
  //               })
  //             }
  //             onBuffer={() =>
  //               this.setState({
  //                 isLoading: paused ? false : true,
  //               })
  //             }
  //             onProgress={() =>
  //               this.setState({
  //                 isLoading: false,
  //               })
  //             }
  //             onLoad={() => {
  //               this.setState({
  //                 isLoading: false,
  //               });

  //               if (paused) {
  //                 this.myRef?.seek?.(0);
  //               }
  //             }}
  //             bufferConfig={{
  //               minBufferMs: 20000,
  //               maxBufferMs: 50000,
  //               bufferForPlaybackMs: 2500,
  //               bufferForPlaybackAfterRebufferMs: 5000,
  //             }}
  //             style={[styles.videoView, videoView && {...videoView}]}
  //           />
  //           <View style={styles.loaderStyle}>
  //             {this.state.isLoading && (
  //               <ActivityIndicator
  //                 animating
  //                 size="small"
  //                 color={Colors.white}
  //               />
  //             )}
  //           </View>
  //         </View>
  //       </InViewPort>
  //     </View>
  //   );
  // }
}

VideoPlayer.propTypes = {};
VideoPlayer.defaultProps = {};

export default VideoPlayer;
