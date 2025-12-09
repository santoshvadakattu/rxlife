import BottomSheet from 'react-native-bottomsheet';
import ImagePicker from 'react-native-image-crop-picker';

export const handleSelectImagePress = (getImage) => {
  BottomSheet.showBottomSheetWithOptions(
    {
      options: ['Camera', 'Gallery', 'Close'],
      title: 'Upload Image',
      dark: false,
      cancelButtonIndex: 2,
    },

    (value) => {
      if (value === 0) {
        ImagePicker.openCamera({
          width: 300,
          height: 152,
          cropping: false,
          useFrontCamera: true,
          mediaType: 'photo',
        }).then((image) => {
          getImage(image);
        });
      }
      if (value === 1) {
        ImagePicker.openPicker({
          width: 300,
          height: 152,
          cropping: false,
          mediaType: 'photo',
        })
          .then((image) => {
            console.log({image});
            getImage(image);
          })
          .catch((err) => {});
      }
    },
  );
};
