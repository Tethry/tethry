import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
// import cardImage from "../../../assets/images/icon/card.png";

interface TransactionHistoryBlockProps {
  transactions: any[];
}

const TransactionHistoryBlock = ({
  transactions,
}: TransactionHistoryBlockProps) => {
  return (
    <View style={styles.transactionhistoryblock}>
      <View className="w-full my-2 flex-row justify-between items-center">
        <Text className="text-xl text-[#8F8F8F] font-bold">Transactions</Text>
        {transactions.length > 5 && (
          <Text className="text-[#8080DC] text-xl font-bold">See All</Text>
        )}
      </View>

      {transactions.map((transaction, index) => (
        <View
          key={index}
          className="w-full my-2 flex-row justify-between items-center border p-4 rounded-xl  border-[#F5F5F5]"
        >
          <View className="flex-row">
            <View className="flex-row justify-center items-center bg-white rounded-full">
              {transaction.credit ? (
                <>
                  {transaction.type === "card" && (
                    <Image
                      source={require("@/assets/images/icon/card.png")}
                      className="w-8 h-8"
                    />
                  )}
                  {transaction.type === "transfer" && (
                    <Feather
                      name={"arrow-up-right"}
                      size={32}
                      color={"black"}
                    />
                  )}
                </>
              ) : (
                <>
                  {transaction.type === "card" && (
                    <Image
                      source={require("@/assets/images/icon/card.png")}
                      className="w-8 h-8"
                    />
                  )}
                  {transaction.type === "transfer" && (
                    <Feather
                      name={"arrow-down-left"}
                      size={32}
                      color={"black"}
                    />
                  )}
                </>
              )}
            </View>

            <View className="ml-5">
              <Text className="text-xl text-[#1E1E1E] font-bold mb-[2px] overflow-hidden text-wrap text-ellipsis">
                Tether USDT
              </Text>
              <Text className="text-md text-[#8F8F8F] font-AlexandriaRegular">
                Successful
              </Text>
            </View>
          </View>

          <View>
            <Text
              className={`text-xl ${
                transaction.credit ? "text-[#5BAE5B]" : "text-red-500"
              } font-AlexandriaRegular`}
            >
              {transaction.credit ? "+" : "-"} {transaction.amount} USDT
            </Text>
          </View>
        </View>
      ))}

      {/* <View className="w-full my-2 flex-row justify-between items-center border p-4 rounded-xl  border-[#F5F5F5]">
        <View className="flex-row">
          <View className="flex-row justify-center items-center bg-white rounded-full">
            <Image source={cardImage} className="w-8 h-8" />
          </View>

          <View className="ml-5">
            <Text className="text-xl text-[#1E1E1E] font-bold mb-[2px] overflow-hidden text-wrap text-ellipsis">
              Tether USDT
            </Text>
            <Text className="text-md text-[#8F8F8F] font-AlexandriaRegular">
              Successful
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-xl text-red-500 font-AlexandriaRegular">
            - 4.50 USDT
          </Text>
        </View>
      </View>

      <View className="w-full my-2 flex-row justify-between items-center border p-4 rounded-xl  border-[#F5F5F5]">
        <View className="flex-row">
          <View className="flex-row justify-center items-center bg-white rounded-full">
            <Feather name={"arrow-down-left"} size={32} color={"black"} />
          </View>

          <View className="ml-5">
            <Text className="text-xl text-[#1E1E1E] font-bold mb-[2px] overflow-hidden text-wrap text-ellipsis">
              Tether USDT
            </Text>
            <Text className="text-md text-[#8F8F8F] font-AlexandriaRegular">
              Successful
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-xl text-[#5BAE5B] font-AlexandriaRegular">
            - 4,000 USDT
          </Text>
        </View>
      </View>

      <View className="w-full my-2 flex-row justify-between items-center border p-4 rounded-xl  border-[#F5F5F5]">
        <View className="flex-row">
          <View className="flex-row justify-center items-center bg-white rounded-full">
            <Image source={cardImage} className="w-8 h-8" />
          </View>

          <View className="ml-5">
            <Text className="text-xl text-[#1E1E1E] font-bold mb-[2px] overflow-hidden text-wrap text-ellipsis">
              Tether USDT
            </Text>
            <Text className="text-md text-[#8F8F8F] font-AlexandriaRegular">
              Successful
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-xl text-red-500 font-AlexandriaRegular">
            - 4.50 USDT
          </Text>
        </View>
      </View>

      <View className="w-full my-2 flex-row justify-between items-center border p-4 rounded-xl  border-[#F5F5F5]">
        <View className="flex-row">
          <View className="flex-row justify-center items-center bg-white rounded-full">
            <Feather name={"arrow-down-left"} size={32} color={"black"} />
          </View>

          <View className="ml-5">
            <Text className="text-xl text-[#1E1E1E] font-bold mb-[2px] overflow-hidden text-wrap text-ellipsis">
              Tether USDT
            </Text>
            <Text className="text-md text-[#8F8F8F] font-AlexandriaRegular">
              Successful
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-xl text-[#5BAE5B] font-AlexandriaRegular">
            - 4,000 USDT
          </Text>
        </View>
      </View> */}

      {transactions.length === 0 && (
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
            paddingBlock: 30,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/Empty_State.png")}
            width={10}
            height={10}
            style={styles.placeholderimg}
          />
        </View>
      )}
    </View>
  );
};

export default TransactionHistoryBlock;

const styles = StyleSheet.create({
  transactionhistoryblock: {
    padding: 13,
    flexDirection: "column",
    gap: 10,
    borderRadius: 7,
  },

  placeholderimg: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
