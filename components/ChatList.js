import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { ChatItem } from "./ChatItem";
import { useRouter } from "expo-router";

export default function ChatList({ users }) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem router={router} item={item} index={index} />
        )}
      />
    </View>
  );
}
