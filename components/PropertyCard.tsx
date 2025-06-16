import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const PropertyCard = ({ property, detail = false, booking,  onPress , onBook}) => {

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isBooked, setIsBooked] = useState(booking.includes(property.id));

	const getFeatureIcon = (feature) => {
		const iconProps = { size: 16, color: '#666' };
		
		if (feature.includes('Bedroom')) return <MaterialIcons name="bed" {...iconProps} />;
		if (feature.includes('Bathroom')) return <MaterialIcons name="bathtub" {...iconProps} />; 
		if (feature.includes('Parking')) return <MaterialIcons name="local-parking" {...iconProps} />;
		if (feature.includes('Pool')) return <MaterialIcons name="pool" {...iconProps} />;
		return null;
	};

	const handlePropertyPress = () => {
		if (onPress) {
		onPress(property);
		}
	};


	const onScroll = (event) => {
		console.log('on scroll')
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / CARD_WIDTH);
		setCurrentImageIndex(currentIndex);
	};

  	return (
		<TouchableOpacity activeOpacity={0.9}
			style={styles.propertyCard} 
			onPress={handlePropertyPress}>

			{/* Image Carousel */}
			<View style={styles.imageContainer}>
				{/* gallery images */}
				<ScrollView horizontal= {true}
					pagingEnabled = {true}
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={16}
					style={styles.imageScroll}
					onScroll={onScroll}>
					{
						property.images.map((image, index) => (
							<Image key={index}
								source={{ uri: image }}
								style={styles.propertyImage}
								resizeMode="cover"/>
						))
					}
				</ScrollView>
				
				{/* Image Indicators */}
				{property.images.length > 1 && (
					<View style={styles.imageIndicators}>
						{
							property.images.map((_, index) => (
								<View key={index}
									style={[ styles.indicator, { opacity: index === currentImageIndex ? 1 : 0.5 }]}/>
							))
						}
						
					</View>
				)}
			</View>

			{/* Property Details */}
			<View style={styles.propertyDetails}>
				{/* pricing section */}
				<View style={styles.priceRow}>
					<Text style={styles.price}>${property.price.toLocaleString()}</Text>
					<Text style={styles.priceLabel}>/month</Text>
				</View>

				{/* name */}
				<Text style={styles.title}>{property.title}</Text>
			
				{/* address */}
				<View style={styles.locationRow}>
					<MaterialIcons name="location-on" 
						size={16} 
						color="#666" />
					<Text style={styles.address}>
						{property.location.address}, {property.location.city}, {property.location.state}
					</Text>
				</View>
			
				{/* available features */}
				<View style={styles.featuresContainer}>
					{
						property.features.map((feature, index) => (
							<View key={index} 
								style={styles.featureItem}>
								{getFeatureIcon(feature)}
								<Text style={styles.featureText}>{feature}</Text>
							</View>
					))}
				</View>

				{/* Booking Section */}
        {
          detail == false &&
            <View style={styles.bookingSection}>
              <TouchableOpacity activeOpacity={0.8}
                disabled={isBooked}
                style={[ styles.bookButton, isBooked && styles.bookButtonBooked]}
                onPress={onBook}>
                <MaterialIcons size={20} 
                  name={isBooked ? "check" : "bookmark-border"} 
                  color={isBooked ? "#fff" : "#ff8000"} />
                <Text style={[ styles.bookButtonText, isBooked && styles.bookButtonTextBooked]}>
                  {isBooked ? "Booked" : "Book Now"}
                </Text>
              </TouchableOpacity>
            </View>
        }
			</View>
		</TouchableOpacity>
  	);
};

const styles = StyleSheet.create({
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 240,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
	width: CARD_WIDTH
  },
  imageScroll: {
    // flex: 1,
	width: CARD_WIDTH
  },
  propertyImage: {
    width: CARD_WIDTH,
    height: 240,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  propertyDetails: {
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontFamily: 'PoppinsMedium',
    color: '#ffb366', 
  },
  priceLabel: {
    fontSize: 14,
	fontFamily: 'PoppinsLight',
    color: '#666',
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
	fontFamily: 'PoppinsMedium',
    color: '#ff8000',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    flex: 1,
	fontFamily: 'PoppinsRegular',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
	fontFamily: 'PoppinsRegular',
  },
  bookingSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
	fontFamily: 'PoppinsRegular',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffcc99',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonBooked: {
    backgroundColor: '#ff8000',
    borderColor: '#ffcc99',
  },
  bookButtonText: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#ff8000',
    marginLeft: 4,
  },
  bookButtonTextBooked: {
    color: '#fff',
	fontFamily: 'PoppinsRegular',
  },
});

export default PropertyCard;