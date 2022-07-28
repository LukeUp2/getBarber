import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
// import Geolocation from '@react-native-community/geolocation'
import { 
  Container, 
  Scroller,

  HeaderArea,
  HeaderTitle,
  SearchButton,

  LocationArea,
  LocationInput,
  LocationFinder,

  LoadingIcon,
  ListArea

} from './styles'

import { useNavigation } from '@react-navigation/native'

import BarberItem from '../../components/BarberItem'

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import Api from '../../Api'

export default function Home() {

  const fakeCoords = {
    accuracy: 20,
    altitude: 5, 
    heading: 0,
    latitude: 37.3142124,
    longitude: -123.092324,
    speed: 0
  }

  const [locationText, setLocationText] = useState()
  const [coords, setCoords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [barberList, setBarberList] = useState([])

  const navigation = useNavigation()

  const handleLocationFinder = async () => {
    setLoading(true)
    setLocationText('')
    setBarberList([])

    setCoords(null);
    console.log('Finge que isso aqui é a localização');

    setCoords(fakeCoords)
    getBarbers()

    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }

  const getBarbers = async () => {
    setLoading(true)
    setBarberList([])

    let lat = null;
    let long = null;

    if(coords){
      lat = coords.latitude;
      long = coords.longitude;
    }

    let res = await Api.getBarbers(lat, long, locationText)
    if(!res.error){
      if(res.loc){
        setLocationText(res.loc)
      }
      setBarberList(res.data)
    } else {
      alert('Erro: ', res.error)
    }

    setLoading(false)
  }

  const handleLocationSearch = () => {
    setCoords(null)
    getBarbers();
  }

  const onRefresh = () => {
    setRefreshing(false)
    getBarbers();
  }

  useEffect(() => {
    getBarbers()
  },[])

  return (
    <Container>
      <Scroller
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
      >
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')} >
            <SearchIcon width="26" height="26" fill="#fff"/>
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput 
            placeholder="Onde você está?"
            placeholderTextColor="#fff"
            value={locationText}
            onChangeText={setLocationText}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>
        {loading &&
          <LoadingIcon size="large" color="#fff"/>
        }

        <ListArea>
          {barberList.map((item, key) => (
            <BarberItem key={key} data={item}/>
          ))}
        </ListArea>


      </Scroller>
    </Container>
  )
}
