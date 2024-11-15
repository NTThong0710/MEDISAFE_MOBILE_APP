import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ConditionCard = ({ name, description, symptoms, causes, prevention }) => {
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <FontAwesome name="heartbeat" size={24} color="#00bfff" style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.detailsContainer}>
        <FontAwesome name="stethoscope" size={16} color="#FF6B6B" style={styles.icon} />
        <Text style={styles.details}><Text style={styles.label}>Triệu chứng:</Text> {symptoms.join(', ')}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <FontAwesome name="exclamation-triangle" size={16} color="#FF6B6B" style={styles.icon} />
        <Text style={styles.details}><Text style={styles.label}>Nguyên nhân:</Text> {causes.join(', ')}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <FontAwesome name="shield" size={16} color="#FF6B6B" style={styles.icon} />
        <Text style={styles.details}><Text style={styles.label}>Phòng ngừa:</Text> {prevention.join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#003366', // Giữ màu nền xanh đậm
    borderRadius: 12,
    padding: 18, // Tăng padding để tạo không gian thoải mái hơn cho nội dung
    marginBottom: 5, 
    marginTop: 10,
     
  },
  
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bfff',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  details: {
    fontSize: 15,
    color: '#fff',
    flex:1,
  },
  label: {
    fontWeight: '600',
    color: '#FF6B6B',
  },
});


export default ConditionCard;
