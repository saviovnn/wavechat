import React, { Component } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItems";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const ios = Platform.OS == "ios";

export default function HomeHeader() {
  const { user, logout } = useAuth();

  const { top } = useSafeAreaInsets();
  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{
        backgroundColor: "#2661bd",
        paddingTop: ios ? top + 5 : top + 10,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        paddingBottom: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: "#171717",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.59,
        elevation: 5,
        boxWithShadow: {
          elevation: 500,
        },
      }}
    >
      {/* Botao para sair */}
      <Pressable
        onPress={handleLogout}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <AntDesign name="arrowleft" size={hp(5)} color="white" />
      </Pressable>

      {/* Texto Principal */}
      <View>
        <Text style={{ fontSize: hp(5), color: "white" }}>Mensagens</Text>
      </View>

      {/* Foto de Perfil */}

      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                // triggerWrapper styles
              },
            }}
          >
            <Image
              style={{ height: hp(6.5), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 45,
                marginLeft: -30,
                width: 100,
                shadowOpacity: 0.2,
              },
            }}
          >
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={
                <FontAwesome name="user-circle" size={hp(3)} color="gray" />
              }
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
