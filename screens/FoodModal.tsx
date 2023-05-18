import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FoodModalProps {
  selectedFoodItem: FoodItem | null;
  onCloseModal: () => void;
}

interface FoodItem {
  id: string;
  name: string;
  origin: string;
  recipe: string;
  variations: string[];
  image: string;
}

const FoodModal: React.FC<FoodModalProps> = ({ selectedFoodItem, onCloseModal }) => {
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

  if (!selectedFoodItem) {
    return null;
  }

  return (
    <Modal visible={true} animationType="slide">
      <Image source={getImageSource(selectedFoodItem.image)} style={styles.modalImage} />
      <TouchableOpacity onPress={onCloseModal} style={styles.backButton}>
        <View style={styles.backButtonCircle}>
          <Icon name="arrow-back" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalTitle}>{selectedFoodItem.name}</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Nguồn gốc / Lịch sử</Text>
            <Text style={styles.sectionText}>{selectedFoodItem.origin}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Nguyên liệu chính</Text>
            <Text style={styles.sectionText}>{selectedFoodItem.recipe}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Biến tấu</Text>
            <Text style={styles.sectionText}>{selectedFoodItem.variations.join('\n')}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    modalImage: {
      width: '100%',
      height: '20%',
      resizeMode: 'cover',
    }
});
  

export default FoodModal;
