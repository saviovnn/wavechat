import { View, Text, ScrollView } from "react-native";

export default function MessageList({ messages }) {
  return (
    <ScrollView
      showsVerticalSrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return MessageItem;
      })}
    </ScrollView>
  );
}
