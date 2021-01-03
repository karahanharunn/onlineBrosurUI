import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';

import Card from '../components/Card';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import { AppService, fetcher, fetcherPost } from '../services/AppService';
import { SEARCH_LOCATION } from '../styles/colors';

import Index from '../components/icons';
import FlexRow from '../components/FlexRow/FlexRow';
import ImageComponent from '../components/Image';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../components/ButtonGroup/ButtonGroup';
import useSelect from '../hooks/useSelect';
import StatusBar from '../components/atoms/StatusBar';
import Logo from '../components/Logo';
import useSWR from 'swr';

const width = Dimensions.get('window').width;
const HomeStack = createSharedElementStackNavigator();
function HomePage(props) {
  const [brandId, setBrandId] = useState();
  const [selected, changeValue, key] = useSelect();

  const { data: HomePageBrosure, error } = useSWR('brochure/homepagebrochure', fetcher)
  const { data: Brands } = useSWR('brand/list', fetcher)
  const { data: BrandBrosure } = useSWR(() => !!brandId ? `brand/getbrochurebybrandId?brandId=${brandId}` : null, fetcher)
  const { data: FilterBrosure } = useSWR(() => !!key ? `brochure/homepagebrochurefilter?filterKey=${key}` : null, fetcherPost)
  console.log(FilterBrosure)
  useEffect(() => {
    if (!!BrandBrosure && BrandBrosure.length > 0) HomePageBrosure.brochures = BrandBrosure;
  }, [BrandBrosure])

  useEffect(() => {
    if (!!FilterBrosure?.brochures && FilterBrosure?.brochures.length > 0) HomePageBrosure.brochures = FilterBrosure?.brochures;
  }, [FilterBrosure])

  const changeBrandId = (id) => setBrandId(id);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {/* <Search /> */}
      <StatusBar />
      {/* <FlexRow>
          <Search
            placeholder="Location"
            left={
              <SvgLocation
                style={{color: 'white'}}
                fill={SEARCH_LOCATION}
                width={16}
                height={16}
              />
            }
            right={<Index id="Search" color={LOGIN_BACKGROUND} size="20" />}
            style={styles.search}
          />
          <Profile />
        </FlexRow> */}
      <FlexRow
      >
        <Logo />
        {/* <Search
            setSearchText={setSearchText}
            style={{
              paddingHorizontal: 6,
              paddingLeft: 12,
              borderRadius: 12,
              backgroundColor: 'white',
              borderWidth: 1,
              borderRightWidth: 0,
              borderColor: '#EFEFF0',
            }}
            placeholder="Broşür Ara..."
            right={
             
            }
          /> */}
        <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: SEARCH_LOCATION,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Index id="Search" color={'white'} size="16" />
          </View>
        </TouchableOpacity>
      </FlexRow>
      <VirtualizedView>
        <View style={[styles.listView, styles.marka]}>
          <Card setBrandId={changeBrandId} data={Brands} {...props} />
          <ButtonGroup>
            {HomePageBrosure?.filters?.map((item) => (
              <Button
                key={`${item.key}`}
                changeValue={() => changeValue(item)}
                selected={selected}
                title={item.name}
              />
            ))}
          </ButtonGroup>
        </View>
        <ImageComponent numColumns={2} {...props} data={HomePageBrosure?.brochures} />
      </VirtualizedView>
    </View>
  );
}

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Anasayfa"
      mode="modal"
      // headerMode="none"
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'center',
          fontSize: 12,
        },
      }}>
      <HomeStack.Screen
        name="Anasayfa"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  listView: {
    width: width,
    display: 'flex',
    backgroundColor: 'white',
    marginTop: 10,
  },
  marka: {
    borderRadius: 20,
    borderColor: '#ECEAF8',
    borderWidth: 0.1,
    backgroundColor: 'white',
  },
});

function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      showsVerticalScrollIndicator={false}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}
