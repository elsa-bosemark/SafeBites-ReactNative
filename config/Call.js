import { Linking, Alert, Platform } from "react-native";

export const callNumber = (phone) => {
  var phoneNum = phone;
  console.warn("callNumber ----> ", phoneNum);
  let phoneNumber = phoneNum;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phoneNum}`;
  } else {
    phoneNumber = `tel:${phoneNum}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};
