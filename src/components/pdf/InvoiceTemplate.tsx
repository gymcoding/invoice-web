/**
 * PDF 견적서 템플릿
 * @react-pdf/renderer를 사용한 견적서 PDF 생성 컴포넌트
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { Invoice } from '@/types/invoice'
import { formatDate, formatCurrency } from '@/lib/format'

// 한글 폰트 등록 (Google Fonts CDN 사용)
Font.register({
  family: 'NotoSansKR',
  src: 'https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.ttf',
})

// PDF 스타일 정의
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'NotoSansKR',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2px solid #000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 11,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#000',
  },
  table: {
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 12,
    fontWeight: 'bold',
    fontSize: 11,
    borderBottom: '2px solid #000',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottom: '1px solid #e5e7eb',
    fontSize: 10,
  },
  col1: {
    width: '50%',
  },
  col2: {
    width: '15%',
    textAlign: 'right',
  },
  col3: {
    width: '15%',
    textAlign: 'right',
  },
  col4: {
    width: '20%',
    textAlign: 'right',
  },
  totalSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '2px solid #000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    fontSize: 14,
  },
  totalLabel: {
    fontWeight: 'bold',
    marginRight: 20,
    color: '#333',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    paddingTop: 20,
    borderTop: '1px solid #e5e7eb',
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
  },
})

interface InvoicePDFDocumentProps {
  invoice: Invoice
}

/**
 * PDF 견적서 Document 컴포넌트
 */
export function InvoicePDFDocument({ invoice }: InvoicePDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>견적서</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>견적서 번호:</Text>
            <Text style={styles.value}>{invoice.invoiceNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>클라이언트:</Text>
            <Text style={styles.value}>{invoice.clientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>발행일:</Text>
            <Text style={styles.value}>
              {formatDate(invoice.issueDate, 'short')}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>유효기간:</Text>
            <Text style={styles.value}>
              {formatDate(invoice.validUntil, 'short')}
            </Text>
          </View>
        </View>

        {/* 항목 테이블 */}
        <View style={styles.table}>
          {/* 테이블 헤더 */}
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>항목</Text>
            <Text style={styles.col2}>수량</Text>
            <Text style={styles.col3}>단가</Text>
            <Text style={styles.col4}>금액</Text>
          </View>

          {/* 테이블 행 */}
          {invoice.items.map((item, index) => (
            <View key={item.id || index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.description}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>
                {formatCurrency(item.unitPrice, { showSymbol: false })}
              </Text>
              <Text style={styles.col4}>
                {formatCurrency(item.amount, { showSymbol: false })}
              </Text>
            </View>
          ))}
        </View>

        {/* 총액 */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>총 금액:</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(invoice.totalAmount, { showWon: true })}
            </Text>
          </View>
        </View>

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text>본 견적서는 발행일로부터 유효기간까지 유효합니다.</Text>
        </View>
      </Page>
    </Document>
  )
}
