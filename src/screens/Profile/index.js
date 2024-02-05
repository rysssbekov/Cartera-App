import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SECTIONS = [
  {
    header: 'Персональные данные',
    items: [
      { icon: 'flag', label: 'ID Студента', type: 'setting', userData: '21B030908'  },
      { icon: 'mail', label: 'Email', type: 'setting', userData: 'b_sultan@kbtu.kz'},
      { icon: 'mail', label: 'Мобильный телефон', type: 'setting', userData: '+620932938232' },
    ],
  },
  {
    header: 'Безопастность',
    items: [
      { icon: 'save', label: 'Настроить верификацию лица', type: 'link' },
      { icon: 'download', label: 'Изменить пароль', type: 'link' },
      { icon: 'download', label: 'Добавить родителя', type: 'link', navigate: 'Parent' },
    ],
  },
];

export default function Example() {

    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View>
                <View className="items-center my-4">
                    <Image source={require("./wrapper.png")}
                        style={{ width: hp(12), height: hp(12.5) }}
                        resizeMode="cover"
                        className="rounded-lg"
                    />
                    <Text className="text-xl font-semibold mt-4">Батыр Султан</Text>
                    <Text className="mt-2">2 курс</Text>
                    <Text className="mt-2">Data science, ИС</Text>
                    <TouchableOpacity
                        className="relative bg-[#3CAE8B] bg-cover py-5 px-10 rounded-xl mt-5" 
                    >
                        <Text className="color-white text-xl font-semibold">Редактировать профиль</Text>
                    </TouchableOpacity>
                </View>
                <View className="items-center ">
                    <View className="bg-white w-[90%] rounded-xl" >  
                        {SECTIONS.map(({ header, items }) => (
                            <View style={styles.section} key={header}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>{header}</Text>
                                </View>
                                <View style={styles.sectionBody}>
                                    {items.map(({ label, type, value, userData, navigate }, index) => {
                                    const isFirst = index === 0;
                                    const isLast = index === items.length - 1;
                                    return (
                                        <View
                                        key={label}
                                        style={[
                                            styles.rowWrapper,
                                            index === 0 && { borderTopWidth: 0 },
                                            isFirst && styles.rowFirst,
                                            isLast && styles.rowLast,
                                        ]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                 navigation.navigate(`${navigate}`)
                                                }}>
                                                <View style={styles.row}>
                                                <Text style={styles.rowLabel}>{label}</Text>

                                                <View style={styles.rowSpacer} />

                                                {(type === 'input' || type === 'link') && (
                                                    <FeatherIcon
                                                    color="#ababab"
                                                    name="chevron-right"
                                                    size={22} />
                                                )}
                                                {(
                                                    type === 'setting' && (
                                                        <View >
                                                            <Text style={[styles.rowLabel, styles.userData]}>{userData}</Text>
                                                            <View style={styles.rowSpacer} />
                                                        </View>
                                                    )
                                                )}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  /** Section */
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    padding: 8,
    paddingLeft: 12,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#adadad',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 0,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabel: {
    fontSize: 13,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    color: '#ababab',
  },
  userData: {
    color: '#001A4D'
  }
});