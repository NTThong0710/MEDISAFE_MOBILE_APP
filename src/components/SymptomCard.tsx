// src/components/SymptomCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SymptomCardProps {
  name: string;
  illnesses: string[];
}

const SymptomCard: React.FC<SymptomCardProps> = ({ name, illnesses }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name="healing" size={24} color="#4A90E2" style={styles.icon} />
        <Text style={styles.symptomName}>{name}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.symptomCauses}>
          <Text style={styles.causeLabel}>Các bệnh thường gặp: </Text>
          {illnesses.join(', ')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#003366',
    borderRadius: 12,
    padding: 20,
    marginBottom: 5,
    borderColor: '#4A90E2',
    marginTop:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    color: '#00bfff',
  },
  symptomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00bfff',
  },
  body: {
    marginTop: 8,
  },
  symptomCauses: {
    fontSize: 16,
    color: '#fff',
  },
  causeLabel: {
    fontWeight: '600',
    color: '#FF6B6B',
  },
});

export default SymptomCard;
