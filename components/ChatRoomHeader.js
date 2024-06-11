import { Stack } from "expo-router";

import { View } from "react-native";

export default function ChatRoomHeader({ user, router }) {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
    </View>
  );
}
