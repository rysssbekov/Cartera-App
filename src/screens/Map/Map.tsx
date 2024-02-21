import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Keyboard,
  Dimensions,
  Animated,
  Linking
} from 'react-native';

const languages = ['kz', 'ru', 'en']

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WebView from 'react-native-webview';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { NativeBaseProvider, Text, Box, Input, View, Button, Image, Divider, Select, FormControl, FlatList, Pressable, Icon } from "native-base";
import Route from './assets/Route';
import Location from './assets/Location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Visible from './assets/Visible';
import Invisible from './assets/Invisible';
import { CARTERA_API_HOST } from '../../api';
const logo = require('./assets/logo.png');
const qr = require('./assets/qr.png');
const pages = [0,1,2,3,4,5]
const asyncSlice = 3

function Map({route : routing, navigation}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [route, setRoute] = useState({from: '', to: ''})
  const [html, setHtml] = useState('')
  const [currentInput, setCurrentInput] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [highlighted, setHighlighted] = useState([])
  const [currentAnimated, setCurrentAnimated] = useState(-1)
  const [page, setPage] = useState(0)
  const [points, setPoints] = useState([])
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [spinValue] = useState(new Animated.Value(0));
  const [currentLangIndex, setCurrentLangIndex] = useState(0)
  const [interfaceVisible, setInterfaceVisible] = useState(true)

  const buildRoute = () => {
    if(route.from.length && route.to.length) {
      Keyboard.dismiss()
      setTimeout(() => {
        webViewRef.current?.postMessage(`{"from": "${route.from}", "to": "${route.to}"}`)
      }, 600)  
    }
  }

  const webViewRef = useRef()

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onMessage = (data : any) => {
    const msg = JSON.parse(data.nativeEvent.data)
    if('page' in msg) {
      setPage(msg.page)
    } else if('highlighted' in msg) {
      setHighlighted(msg.highlighted)
      if(msg.highlighted.length > 1) {
        setCurrentAnimated(msg.highlighted[1])
      }
    } else if('points' in msg) {
      setPoints(msg.points)
    }
  }

  const getHtml = async (remote : string) => {
    const res = await fetch(`${CARTERA_API_HOST}/html/map_full.html`)
    const data = await res.text()
    setHtml(data)
    const sliceLength = Math.ceil(data.length / 3)
    for(let i = 0; i < asyncSlice; i++) {
      const sliced = data.slice(i * sliceLength, (i + 1) * sliceLength)
      //console.log(sliced.length)
      await AsyncStorage.setItem('html-' + i, sliced)
    }
    await AsyncStorage.setItem('last-updated', remote)
  }

  const checkHtml = async (updatedRemote : string) => {
    const lastUpdated = await AsyncStorage.getItem('last-updated')
    let htmlLocal = "", allItems = true
    for(let i = 0; i < asyncSlice; i++) {
      const item = await AsyncStorage.getItem('html-' + i)
      if(item && item.length) {
        htmlLocal += item
      } else {
        allItems = false
        break
      }
    }
    if((lastUpdated == updatedRemote || updatedRemote == 'no-connection') && htmlLocal.length && allItems) {
      //console.log(htmlLocal.length)
      setHtml(htmlLocal)
    } else {
      getHtml(updatedRemote)
    }
  }

  const getLastUpdated = async () => {
    try {
      const res = await fetch(`${CARTERA_API_HOST}/map-last-updated`)
      const data = await res.json()
      const updatedRemote = data.value
      checkHtml(updatedRemote)
    } catch(e) {
      checkHtml('no-connection')
    }
  }

  useEffect(() => {
    getLastUpdated()
  }, [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 100,
          duration: 500,
          delay: 100,
          useNativeDriver: false
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        })
      ])
    ).start()
  }, [currentAnimated])

  const updatePage = (p : number, curr : number) => {
    //console.log(p, curr)
    if(p === curr) {
      setCurrentAnimated(highlighted.length - highlighted.indexOf(curr) - 1 > 0 ? highlighted[highlighted.indexOf(curr) + 1] : -1)
    }
    setPage(p)
    webViewRef.current?.postMessage(`{"page": ${p}}`)
  }

  const onPressFrom = () => {
    setCurrentInput('from')
    if(!points.length) {
      webViewRef.current?.postMessage(`{"points": true}`)
    }
  }

  const onPressTo = () => {
    setCurrentInput('to')
    if(!points.length) {
      webViewRef.current?.postMessage(`{"points": true}`)
    }
  }

  useEffect(() => {
    if(webViewRef.current) {
      webViewRef.current?.postMessage(`{"points": true}`)
    }
  }, [webViewRef.current])

  useEffect(() => {
    if(routing.params?.url) {
      handleUrl({url: routing.params?.url})
    }
  }, [routing.params?.url])

  const zoomIncrease = e => {
    webViewRef.current?.postMessage(`{"zoom": "increase"}`)
  }

  const zoomDecrease = e => {
    webViewRef.current?.postMessage(`{"zoom": "decrease"}`)
  }

  const handleUrl = e => {
    const parsed = e.url?.replace("kbtu-map://", "").split("/")
    if(parsed.length > 1) {
      setRoute(r => (
          {
            from: decodeURI(parsed[1]).replaceAll("-", " "),
            to: r.to
          }
        )
      )
    }
  }

  useEffect(() => {
    Linking.getInitialURL().then(url => {            
      if (url) {
         handleUrl({url})
      }
    })
    .catch(err => {
      console.error(err);
    });
    Linking.addEventListener('url', handleUrl);
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height)
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const currentLanguage = languages[currentLangIndex]
  const filtered = points.filter(p => `${p.id}${p.alias ? ` - ${p.alias[currentLanguage]}` : ''}`?.toLowerCase().includes(route[currentInput]?.toLowerCase()) && (currentInput.length ? currentInput === 'from' ? p.id != route.to : p.id != route.from : true))
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
            <View style={{flex: 1}}>
              <WebView 
                ref={webViewRef} 
                source={{html}} 
                style={{ flex: 1 }} 
                onMessage={onMessage}
              />
              <View style={styles.header}>
                <View>
                  <Button ml={2} _pressed={{bg: "#002353"}} borderRadius={0} borderWidth={0.17} shadow={8} bg="#002353" onPress={() => setInterfaceVisible(vis => !vis)}>
                    {interfaceVisible ? (
                      <Visible />
                    ) : (
                      <Invisible />
                    ) }
                  </Button>
                </View>
                <Image
                  source={logo}
                  style={{width: 125, height: 54}}
                  alt="logo"
                />
                <Button mr={2} _pressed={{bg: "#002353"}} borderRadius={0} borderWidth={0.17} shadow={8} bg="#002353" onPress={() => setCurrentLangIndex(i => i === 2 ? 0 : i + 1)}>
                  {languages[currentLangIndex].toUpperCase()}
                </Button>
                {/* <View style={styles.shadow} marginRight={2}>
                  <View paddingX={3.5} paddingY={2.5} style={styles.langButton}>
                    <Text color="#FFFFFF">
                      
                    </Text>
                  </View>
                </View> */}
              </View>
              <View style={[styles.inputWrapper, {display: interfaceVisible ? 'flex' : 'none'}]}>
                <View style={styles.inputContainer}>
                  <View flexDir="row" alignItems="center">
                    <View mr={14}>
                      <Route />
                    </View>
                    <View flexGrow={1}>
                      <View>
                        <Input 
                          onPressIn={onPressFrom} 
                          value={route.from} 
                          onChangeText={text => setRoute(r => ({...r, from: text}))} 
                          borderRadius={12} _input={{ bg: '#F8F8F8', paddingY: 2, paddingX: 2 }} 
                          w="100%" 
                          mb={30} 
                          placeholder='Отсканируйте QR / Введите номер кабинета' 
                          InputRightElement={(
                            <View bg="transparent">
                              
                            </View>
                          )}
                        />
                        <View position='absolute' right={1} top={1.5}>
                          <Pressable onPress={() => navigation.navigate('QR')}>
                            <Image
                              source={qr}
                              style={{width: 32, height: 32}}
                              alt="qr"
                            /> 
                          </Pressable>
                        </View>
                      </View>
                      <Input onPressIn={onPressTo} value={route.to} onChangeText={text => setRoute(r => ({...r, to: text}))} borderRadius={12} _input={{ bg: '#F8F8F8', paddingY: 2, paddingX: 2 }} w="100%" placeholder='Введите номер кабинета' />
                    </View>
                  </View>
                </View>
              </View>
              <View display={isKeyboardVisible && interfaceVisible ? 'flex' : 'none'} style={styles.searchWrapper}>
                <View maxH={Dimensions.get('screen').height - 390 - keyboardHeight} style={styles.searchContainer}>
                  {currentInput.length ? (
                    <FlatList
                      maxH={'100%'}
                      data={filtered.length ? filtered : [{message: {
                        'ru': 'Кабинет не найден',
                        'kz': 'Кабинет табылмады',
                        'en': 'Cabinet not found'
                      }}]}
                      renderItem={({item}) => item.message ? (
                        <View flexDir="row" alignItems="center" mb={2}>
                          <Text color="#45484C" fontWeight="700" fontSize={16} opacity={0.23} ml={1}>{item.message[currentLanguage]}</Text>
                        </View>
                      ) : (
                        <TouchableOpacity onPress={() => {
                          Keyboard.dismiss()
                          setRoute(r => ({...r, [currentInput]: item.id}))
                        }}>
                          <View flexDir="row" alignItems="center" mb={2}>
                            <Location />
                            <Text color="#45484C" fontWeight="700" fontSize={16} opacity={0.23} ml={1}>{`${item.id}${item.alias && item.alias[currentLanguage] ? ` - ${item.alias[currentLanguage]}` : ''}`}</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => `${item.id}-${item.block}-${item.lat}-${item.lng}`}
                    />
                  ) : null}
                </View>
              </View>
              <View style={styles.zoomWrapper}>
                  <View>
                    <Button bg={'#FFFFFF'} _pressed={{bg: '#002353'}} borderTopLeftRadius={12} borderBottomLeftRadius={0} borderBottomRightRadius={0} borderTopRightRadius={12} borderBottomWidth={0.25} borderBottomColor="#D6D8DE" onPress={zoomIncrease} style={styles.zoomButton}>
                      <Text style={styles.zoomButtonText}>
                        +
                      </Text>
                    </Button>
                    <Button bg={'#FFFFFF'} _pressed={{bg: '#002353'}} borderBottomLeftRadius={12} borderTopLeftRadius={0} borderTopRightRadius={0} borderBottomRightRadius={12} onPress={zoomDecrease} style={styles.zoomButton}>
                      <Text style={styles.zoomButtonText}>
                        -
                      </Text>
                    </Button>
                  </View>
              </View>
              <View display={isKeyboardVisible ? 'none' : interfaceVisible ? 'flex' : 'none'} style={styles.floorsWrapper}>
                <View style={styles.floorButtons}>
                  {pages.map((p, i) => {
                    const commonViewStyle = {
                      borderTopLeftRadius: i === 0 ? 12 : 0,
                      borderTopRightRadius:  i === 0 ? 12 : 0,
                      borderBottomLeftRadius: i === pages.length - 1 ? 12 : 0,
                      borderBottomRightRadius: i === pages.length - 1 ? 12 : 0,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                    const commonTextStyle = {
                      fontWeight: '500', 
                      fontSize: 22,
                      lineHeight: 24
                    }
                    return (
                    <View flexDir="column">
                      <TouchableOpacity onPress={() => updatePage(p, currentAnimated)}>
                        {p === currentAnimated ? (
                          <Animated.View style={[commonViewStyle, {
                            backgroundColor: spinValue.interpolate({
                              inputRange: [0, 100],
                              outputRange: ["#002353", "#FFFFFF"]
                            })
                          }]}>
                            <Animated.Text style={[commonTextStyle, {
                              color: spinValue.interpolate({
                                inputRange: [0, 100],
                                outputRange: ["#FFFFFF", "#002353"]
                              }) 
                            }]}>
                              {p}
                            </Animated.Text>
                          </Animated.View>
                        ) : (
                          <View style={[commonViewStyle, {
                            backgroundColor: page === p ? '#002353' : highlighted.length && highlighted.includes(p) ? 'transparent' : 'rgba(217,217,217,0.4)',
                          }]}>
                            <Text style={[commonTextStyle, {
                              color: page === p ? 'white' : '#002353', 
                            }]}>
                              {p}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                      {/* <Button 
                        onPress={(e) => updatePage(p)}  
                        bg={page === p ? '#002353' : highlighted.length && highlighted.includes(p) ? 'transparent' : 'rgba(217,217,217,0.4)'}
                        borderTopLeftRadius={i === 0 ? 12 : 0}
                        borderTopRightRadius={i === 0 ? 12 : 0}
                        borderBottomRightRadius={i === pages.length - 1 ? 12 : 0}
                        borderBottomLeftRadius={i === pages.length - 1 ? 12 : 0}
                        _pressed={{bg: '#002353'}}
                        _text={{color: page === p ? 'white' : '#002353', fontWeight: '500', fontSize: 22, paddingX: 1}}
                      >
                          {`${p}`}
                      </Button> */}
                      {i != pages.length - 1 &&
                      (
                        <View bg={highlighted.length && highlighted.includes(p) ? 'transparent' : 'rgba(217,217,217,0.4)'} px={3}>
                          <Divider bg={"#D6D8DE"}/>
                        </View>
                      )}
                    </View>
                    )
                  })}
                </View>
              </View>
              <View display={interfaceVisible ? 'flex' : 'none'} style={styles.buttonWrapper}>
                    <Button borderRadius={24} backgroundColor="#002353" _text={{textTransform: 'uppercase', fontWeight: '600', fontSize: 15}} onPress={buildRoute}>Построить маршрут</Button>
              </View>
            </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputWrapper: {
    position: 'absolute', 
    top: 100, 
    width: '100%',
  },
  searchWrapper: {
    position: 'absolute', 
    top: 270, 
    width: '100%',
  },
  zoomWrapper: {
    position: 'absolute',
    marginTop: 50,
    right: 20, 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  zoomButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  zoomButtonText: {
    fontWeight: '500', 
    fontSize: 22,
    lineHeight: 24,
    color: '#002353'
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  header: {
    position: 'absolute', 
    top: 0,
    height: 80,
    backgroundColor: '#002353',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  floorButton: {

  },
  floorsWrapper: {
    position: 'absolute',
    marginTop: 50,
    left: 20, 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  floorButtons: {
    flexDirection: 'column',
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 32
  },
  langButton: {
    backgroundColor: '#002353',
    zIndex: 999,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10, // changed to a greater value
    flexDirection: 'row',
    borderWidth: 0.5,
    zIndex: 99, // added zIndex
  }
});

export default Map;
