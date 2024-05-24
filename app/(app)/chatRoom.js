import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component } from "react";
import { Text, View } from "react-native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { StatusBar } from "expo-status-bar";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <ChatRoomHeader user={item} router={router} />
    </View>
  );
}
