import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View, } from 'react-native';

const { width } = Dimensions.get('window');

const PropertyDetail = () => {
	const params = useLocalSearchParams();
	const navigation = useNavigation();

	const [property, setProperty] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	// Remove default header title
	useLayoutEffect(() => {
		navigation.setOptions({ title: '' });
		if (params.property) {
			try {
			const parsed = JSON.parse(params.property as string);
			setProperty(parsed);
			setLoading(false);
			} catch (e) {
			console.error('Failed to parse property data:', e);
			setLoading(false);
			}
		}
	}, [navigation]);


	const getFeatureIcon = (feature) => {
		const iconProps = { size: 18, color: '#666' };
		
		if (feature.includes('Bedroom')) return <MaterialIcons name="bed" {...iconProps} />;
		if (feature.includes('Bathroom')) return <MaterialIcons name="bathtub" {...iconProps} />; 
		if (feature.includes('Parking')) return <MaterialIcons name="local-parking" {...iconProps} />;
		if (feature.includes('Pool')) return <MaterialIcons name="pool" {...iconProps} />;
		return null;
	};
	
  return (
    <ScrollView style={styles.container}>
		{
			loading?
			<View style={styles.center}>
				<ActivityIndicator size="large" color="#ffb366" />
			</View>
		:
			<>
				<ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
					{property.images.map((img: string, index: number) => (
					<Image key={index} source={{ uri: img }} style={styles.image} resizeMode="cover" />
					))}
				</ScrollView>

				<View style={styles.header}>
					<Text style={styles.title}>{property.title}</Text>
					<Text style={styles.price}>${property.price.toLocaleString()} / month</Text>
					<Text style={styles.address}>
					{property.location?.address}, {property.location?.city}, {property.location?.state}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Features</Text>
					<View style={styles.featureList}>
						{
							property.features.map((feature: string, idx: number) => (
								<View key={idx}  
									style={styles.featureItemWrapper}>
									{getFeatureIcon(feature)}
									<Text style={styles.featureItem}>{feature}</Text>
								</View>
							))
						}
					</View>
				</View>
			</>
		}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width,
    height: 250,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#e9ecef',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 26,
    fontFamily: 'PoppinsBold',
    color: '#212529',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontFamily: 'PoppinsRegular',
    color: '#ff7f50',
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#666',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: '#212529',
    marginBottom: 10,
  },
  featureList: {
    paddingLeft: 8,
  },
  featureItemWrapper: {
	flex:1 ,
	flexDirection: 'row',
	alignItems: 'center',
  },
  featureItem: {
    fontSize: 16,
	lineHeight: 28,
    fontFamily: 'PoppinsRegular',
    color: '#444',
    // marginBottom: 6,
	marginTop: 2,
	marginLeft: 8
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PropertyDetail;
