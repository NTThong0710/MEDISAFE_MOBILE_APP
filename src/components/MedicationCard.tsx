import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface MedicationCardProps {
  name: string;
  genericName: string;
  purpose: string[];
  instructions: string[];
  sideEffects: string[];
  contraindications: string[];
}

const formatList = (list: string[]) => (list.length > 0 ? list.join(', ') : 'N/A');

const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  genericName,
  purpose,
  instructions,
  sideEffects,
  contraindications,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    instructions: false,
    sideEffects: false,
    contraindications: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="local-pharmacy" size={30} color="#00BFFF" />
        <Text style={styles.brandName}>{name || 'No Brand Name'}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="local-pharmacy" size={20} color="white" />
        <Text style={styles.label}>Tên chung:</Text>
        <Text style={styles.info}>{genericName || 'N/A'}</Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="assignment" size={20} color="white" />
        <Text style={styles.label}>Mục đích sử dụng:</Text>
        <Text style={styles.info}>{formatList(purpose)}</Text>
      </View>

      <TouchableOpacity style={styles.toggleRow} onPress={() => toggleSection('instructions')}>
        <MaterialIcons name="description" size={20} color="white" />
        <Text style={styles.label}>Hướng dẫn sử dụng:</Text>
        <MaterialIcons name={expandedSections.instructions ? "expand-less" : "expand-more"} size={20} color="white" />
      </TouchableOpacity>
      {expandedSections.instructions && (
        <Animated.View style={[styles.details, { opacity: expandedSections.instructions ? 1 : 0 }]}>
          <Text style={styles.detailsText}>{formatList(instructions)}</Text>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.toggleRow} onPress={() => toggleSection('sideEffects')}>
        <MaterialIcons name="warning" size={20} color="#d9534f" />
        <Text style={[styles.label, styles.warningLabel]}>Tác dụng phụ:</Text>
        <MaterialIcons name={expandedSections.sideEffects ? "expand-less" : "expand-more"} size={20} color="white" />
      </TouchableOpacity>
      {expandedSections.sideEffects && (
        <Animated.View style={[styles.details, { opacity: expandedSections.sideEffects ? 1 : 0 }]}>
          <Text style={styles.detailsText}>{formatList(sideEffects)}</Text>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.toggleRow} onPress={() => toggleSection('contraindications')}>
        <MaterialIcons name="block" size={20} color="#d9534f" />
        <Text style={[styles.label, styles.dangerLabel]}>Chống chỉ định:</Text>
        <MaterialIcons name={expandedSections.contraindications ? "expand-less" : "expand-more"} size={20} color="white" />
      </TouchableOpacity>
      {expandedSections.contraindications && (
        <Animated.View style={[styles.details, { opacity: expandedSections.contraindications ? 1 : 0 }]}>
          <Text style={styles.detailsText}>{formatList(contraindications)}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#003366', 
    borderRadius: 16, // Softer corners
    padding: 24,
    marginVertical: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#005b8f',
    letterSpacing:1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#00BFFF',
    textTransform: 'uppercase', // Adds emphasis to brand name
  },
  label: {
    fontWeight: '700', // Stronger label font
    marginLeft: 6,
    color: '#ffffff',
    fontSize: 16,
  },
  info: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#005b8f', // Slightly darker blue background
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#003f73',
    justifyContent: 'center',
  },
  details: {
    marginTop: 8,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 40,
    paddingVertical: 10,
    opacity: 0,
    letterSpacing:0.6,
  },
  detailsText: {
    fontSize: 16,
    color: '#ffffff',
  },
  warningLabel: {
    color: '#d9534f',
  },
  dangerLabel: {
    color: '#c9302c', // Slightly darker red for contraindications
  },
});

export default MedicationCard;
