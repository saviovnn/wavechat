import React from "react";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId == message?.userId) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 3,
          marginRight: 3,
        }}
      >
        <View style={{ width: wp(80) }}>
          <View
            className="rounded-2xl bg-white "
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-end",
              padding: 5,
              paddingHorizontal: 15,
              margin: 3,
              marginRight: 3,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: hp(2) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 3,
          marginLeft: 3,
        }}
      >
        <View
          className="rounded-2xl  "
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-start",
            backgroundColor: "#e0e3f4",
            padding: 5,
            paddingHorizontal: 15,
            margin: 3,
            marginLeft: 3,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: hp(2) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
}
