import { View, Text, StyleSheet, Image } from 'react-native';
import { Star } from 'lucide-react-native';

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    userImage: string;
    rating: number;
    date: string;
    comment: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: review.userImage }}
          style={styles.userImage}
        />
        
        <View style={styles.reviewHeaderContent}>
          <Text style={styles.userName}>{review.userName}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  color="#FFD700"
                  fill={star <= review.rating ? '#FFD700' : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewHeaderContent: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stars: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8C8C8C',
  },
  reviewComment: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});