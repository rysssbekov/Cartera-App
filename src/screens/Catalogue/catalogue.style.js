import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    tab: (activeCategory, item) => ({
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: activeCategory === item ? '#569DA9' : '#FFFFFF',
        backgroundColor: activeCategory === item ? '#569DA9' : '#FFFFFF',
      }),
      tabText: (activeCategory, item) => ({
        color: activeCategory === item ? '#FFF' : '#569DA9',
        fontWeight: 600,
      }),
})

export default styles;