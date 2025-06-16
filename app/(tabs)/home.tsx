
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';

import PropertyCard from '@/components/PropertyCard';
import useDataStore from '@/store/dataStore';

const PropertyListing = () => {
    const stored_data = useDataStore((state) => state.data);
    const { data, loading, error, fetchUsers, addBookingToProfile } = useDataStore();
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [properties, setProperties] = useState([]);
    const [profile, setProfile] = useState([]);

    useEffect(()=> {
        if (stored_data) {
            setProperties(stored_data);
            setProfile(stored_data.profile.bookings);
            setLoadingStatus(false);
        } else {
            fetchUsers();
        }
    }, [stored_data, loading]);


    const handlePropertyPress = (property) => {
        const minimalProperty = {
            id: property.id,
            title: property.title,
            price: property.price,
            location: property.location,
            features: property.features,
            images: property.images,
        };
        router.push({
            pathname: `/property/${property.id}`,
            params: {
                property: JSON.stringify(minimalProperty)
                
            }
        });
    };

    const handleBook = (property) => {
        addBookingToProfile(property.id) 
        // confirmation toast
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                'Congratulations! '+property.title+' booked successfully.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
        
    }
    
    const renderProperty = ({ item }) => (
        <PropertyCard  property={item} 
            booking = {profile}
            onBook= {()=> handleBook(item)}
            onPress={handlePropertyPress}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            {
                loadingStatus ? 
                    <View style= {styles.center}>
                        <ActivityIndicator size="large" 
                            color="#ffb366" />
                    </View>
                :
                    <>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>RaftLabs Properties</Text>
                            <Text style={styles.headerSubtitle}>{data.properties.length} properties available</Text>
                        </View>
                        
                        {/* Property List */}
                        <FlatList data={properties.properties}
                            renderItem={renderProperty}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContainer} />
                    </>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    color: '#212529',
    // marginBottom: 4,
    fontFamily: 'PoppinsBold'
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'PoppinsRegular'
  },
  listContainer: {
    padding: 16,
  },
  center: {
    flex:1 ,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PropertyListing;