import foodItemsData from '../assets/foodItems.json'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Animated, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


const windowHeight = Dimensions.get('window').height;
const modalHeight = Math.round(windowHeight * 0.9);

const IMAGE_SIZE = 60;
const SPACING = 20;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;



const DataScreen: React.FC = () => {
const [modalVisible, setModalVisible] = useState(false);
const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);

interface FoodItem {
  id: string;
  name: string;
  origin: string;
  recipe: string;
  variations: string[];
  image: string;
}

const foodItems: FoodItem[] = foodItemsData

const scrollY = useRef(new Animated.Value(0)).current;



const renderItem = ({ item, index }) => {
  const inputRange = [
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 2),
  ]

  const opacityInputRange = [
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 1),
  ]
  
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0]
  })

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0]
  })


  return (
  <TouchableOpacity onPress={() => handleFoodItemPress(item)}>
    <Animated.View style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: SPACING,
        marginBottom: SPACING,
        flexDirection: 'row',
        borderRadius: 12,
        opacity,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: SPACING,
        transform: [{scale}]}}>
      <Image source={getImageSource(item.image)} style={styles.foodItemImage} />
      <View>
        <Text style={styles.foodItemName}>{item.name}</Text>  
      </View>
    </Animated.View>
  </TouchableOpacity>
  )
  };


const handleFoodItemPress = (item: FoodItem) => {
  setSelectedFoodItem(item);
  setModalVisible(true);
};

const getImageSource = (imagePath: string) => {
  let imageSource;
  switch (imagePath) {
    case 'banh_canh':
      imageSource = require('../assets/foodImages/banh_canh.jpg');
      break;
    case 'banh_chung':
      imageSource = require('../assets/foodImages/banh_chung.jpg');
      break;
    case 'banh_cuon':
      imageSource = require('../assets/foodImages/banh_cuon.jpg');
      break;
    case 'banh_khot':
      imageSource = require('../assets/foodImages/banh_khot.jpg');
      break;
    case 'banh_mi':
      imageSource = require('../assets/foodImages/banh_mi.jpg');
      break;
    case 'banh_trang_nuong':
      imageSource = require('../assets/foodImages/banh_trang_nuong.jpg');
      break;
    case 'banh_xeo':
      imageSource = require('../assets/foodImages/banh_xeo.jpg');
      break;
    case 'bun':
      imageSource = require('../assets/foodImages/bun.jpg');
      break;
    case 'canh_chua':
      imageSource = require('../assets/foodImages/canh_chua.jpg');
      break;
    case 'chao_long':
      imageSource = require('../assets/foodImages/chao_long.jpg');
      break;
    case 'com_tam':
      imageSource = require('../assets/foodImages/com_tam.jpg');
      break;
    case 'goi_cuon':
      imageSource = require('../assets/foodImages/goi_cuon.jpg');
      break;
    case 'hu_tieu':
      imageSource = require('../assets/foodImages/hu_tieu.jpg');
      break;
    case 'mi_quang':
      imageSource = require('../assets/foodImages/mi_quang.jpg');
      break;
    case 'pho':
      imageSource = require('../assets/foodImages/pho.jpg');
      break;
  }
  return imageSource;
};

const closeModal = () => {
  setModalVisible(false);
  setSelectedFoodItem(null);
};

return (
  <View style={styles.container}>
    <Image
      source={require('../assets/foodImages/background.jpg')}
      style={StyleSheet.absoluteFillObject}
      
    />

    
    <Animated.FlatList
      data={foodItems}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        { useNativeDriver: true},
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 20,
        paddingTop: 40,
      }}
    /> 

    <Modal visible={modalVisible} animationType="slide">
        <Image source={getImageSource(selectedFoodItem?.image)} style={styles.modalImage} />
        <TouchableOpacity onPress={closeModal} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Icon name="arrow-back" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedFoodItem?.name}</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Nguồn gốc / Lịch sử</Text>
                <Text style={styles.sectionText}>{selectedFoodItem?.origin}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Nguyên liệu chính</Text>
                <Text style={styles.sectionText}>{selectedFoodItem?.recipe}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Biến tấu</Text>
                <Text style={styles.sectionText}>{selectedFoodItem?.variations.join('\n')}</Text>
              </View>
            </ScrollView>
        </View>
    </Modal>
  </View>
);

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 48,
    marginHorizontal: 12,
  },
  sectionContent: {
    marginBottom: 16,
    backgroundColor: '#fafcff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 12,
  },
  sectionText: {
    fontWeight: '400',
    color: 'gray',
    margin: 12,
  },
  backButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    borderRadius: 4,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginVertical: 64,
  },
  foodItemName: {
    marginTop: 12,
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
  },
  modalImage: {
    width: '100%',
    height: '20%',
    resizeMode: 'cover',
  },
  foodItemImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginRight: 15,
    borderRadius: 30,
  },
});



export default DataScreen;


