import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useDataStore from '@/store/dataStore';

const { width } = Dimensions.get('window');

const ProfilePage = () => {
    const stored_data = useDataStore((state) => state.data);
    const { data, loading, error, fetchUsers } = useDataStore();
    
    const [activeTab, setActiveTab] = useState('overview');
    const [profileData, setProfileData] = useState({});
    const [loadingStatus, setLoadingStatus] = useState(true);
    
    useEffect(()=> {
        if (stored_data) {
            setProfileData(stored_data.profile);
            setLoadingStatus(false);
        } else {
            fetchUsers();
        }
    }, [stored_data,loading]);

    const renderOverviewTab = () => (
        <View style={styles.tabContent}>
            {/* total bookings */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <MaterialIcons name="bookmark" 
                        size={24} 
                        color="#ff8000" />
                    <Text style={styles.statNumber}>{profileData.bookings.length}</Text>
                    <Text style={styles.statLabel}>Total Bookings</Text>
                </View>
            </View>

            {/* profile details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                
                <View style={styles.infoItem}>
                    <MaterialIcons name="email" 
                        size={20} 
                        color="#666" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{profileData.email}</Text>
                    </View>
                </View>
                
                <View style={styles.infoItem}>
                    <MaterialIcons name="person" 
                        size={20} 
                        color="#666" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>User ID</Text>
                        <Text style={styles.infoValue}>{profileData.id}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const viewBooking = () => {
        router.push('/booking');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {
                loadingStatus ? 
                    <View style= {styles.center}>
                        <ActivityIndicator size="large" 
                            color="#ffb366" />
                    </View>
                :
                    <>
                        {/* general details */}
                        <View style={styles.header}>
                            <View style={styles.profileImageContainer}>
                                <View style={styles.profileImage}>
                                    <MaterialIcons name="person" 
                                        size={40} 
                                        color="#ff8000" />
                                </View>
                            </View>
                            <Text style={styles.profileName}>{profileData.name}</Text>
                        </View>

                        {/* Tab Navigation */}
                        <View style={styles.tabContainer}>
                            <TouchableOpacity activeOpacity={0.7}
                                style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
                                onPress={() => setActiveTab('overview')}>
                                <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                                    Overview
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity activeOpacity={0.7}
                                style={[styles.tab, activeTab === 'bookings' && styles.activeTab]}
                                onPress={() => viewBooking()}>
                                <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>
                                    Bookings
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Tab Content */}
                        {
                            activeTab === 'overview' &&
                                renderOverviewTab() 
                        }
                    </>
            }
        </ScrollView>
    );
};


export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffcc99',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'PoppinsMedium',
    color: '#ff8000',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#ff8000',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#666',
  },
  activeTabText: {
    color: '#ff8000',
    fontFamily: 'PoppinsMedium',
  },
  tabContent: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'PoppinsMedium',
    color: '#ff8000',
    marginTop: 8,
    marginBottom: 4,
    marginHorizontal: 4
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
    color: '#ff8000',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#333',
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bookingInfo: {
    marginLeft: 16,
    flex: 1,
  },
  bookingTitle: {
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
    color: '#333',
    marginBottom: 2,
  },
  bookingStatus: {
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
    color: '#28a745',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#666',
    marginTop: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffcc99',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
    color: '#ff8000',
    marginLeft: 8,
  },
  center: {
    flex:1 ,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ProfilePage;