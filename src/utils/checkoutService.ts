import emailjs from '@emailjs/browser';
import { jsPDF } from 'jspdf';
import type { CartItem } from '../components/CartDrawer';

export interface CheckoutPayload {
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  deliveryWindow: string;
  tier: string;
}

const EMAILJS_SERVICE_ID = 'service_srd1jh9';
const EMAILJS_TEMPLATE_ID = 'o142vmk'; // Matches your active template in EmailJS
const EMAILJS_PUBLIC_KEY = 'lQIdxor0FPyz5Gtam';
const DEFAULT_FALLBACK_EMAIL = 'chegofatsoemeritus1704@gmail.com';

const loadImageAsBase64 = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

export const generateAndDownloadReceiptPDF = async (payload: CheckoutPayload, orderId: string) => {
  const doc = new jsPDF();

  // Dark Obsidian Header Banner
  doc.setFillColor(12, 12, 12);
  doc.rect(0, 0, 210, 48, 'F');

  // Attempt to embed logo from /public if present, otherwise render styled emblem
  const logoBase64 = await loadImageAsBase64('/nyuku-logo.png');
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 14, 10, 28, 28);
    doc.setTextColor(251, 191, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('NYÜKU SOUTH AFRICA', 48, 23);

    doc.setTextColor(190, 190, 190);
    doc.setFontSize(8.5);
    doc.text('OFFICIAL ARCHIVE TAX INVOICE • ZEBEDIELA, LIMPOPO', 48, 31);
  } else {
    doc.setTextColor(251, 191, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('NYÜKU SOUTH AFRICA', 14, 24);

    doc.setTextColor(190, 190, 190);
    doc.setFontSize(9);
    doc.text('OFFICIAL ARCHIVE TAX INVOICE • ZEBEDIELA, LIMPOPO', 14, 32);
  }

  // Gold Accent Bar under Header
  doc.setFillColor(212, 163, 89);
  doc.rect(0, 48, 210, 3, 'F');

  // Order Meta Info
  doc.setTextColor(25, 25, 25);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`ORDER REF: ${orderId}`, 14, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date Issued: ${new Date().toLocaleDateString('en-ZA')}`, 145, 62);

  // Billed To
  doc.setFont('helvetica', 'bold');
  doc.text('BILLED TO:', 14, 74);
  doc.setFont('helvetica', 'normal');
  doc.text(payload.customerName, 14, 80);
  doc.text(payload.customerEmail || DEFAULT_FALLBACK_EMAIL, 14, 86);
  doc.text(`Syndicate Tier: ${payload.tier.toUpperCase()} VIP`, 14, 92);
  doc.text(`Courier Dispatch Window: ${payload.deliveryWindow}`, 14, 98);

  // Table Headers
  let yPos = 112;
  doc.setDrawColor(212, 163, 89);
  doc.setLineWidth(0.5);
  doc.line(14, yPos - 6, 196, yPos - 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Garment / Archive Piece', 14, yPos);
  doc.text('Size', 122, yPos);
  doc.text('Qty', 145, yPos);
  doc.text('Total', 175, yPos);

  yPos += 4;
  doc.line(14, yPos, 196, yPos);
  yPos += 9;

  // Items
  doc.setFont('helvetica', 'normal');
  payload.items.forEach((item) => {
    doc.text(item.product.title.substring(0, 44), 14, yPos);
    doc.text(item.size, 122, yPos);
    doc.text(String(item.quantity), 147, yPos);
    doc.text(item.product.price, 175, yPos);
    yPos += 8;
  });

  // Totals Section
  yPos += 4;
  doc.setDrawColor(220, 220, 220);
  doc.line(14, yPos, 196, yPos);
  yPos += 9;

  doc.text('Subtotal', 122, yPos);
  doc.text(`R ${payload.subtotal.toFixed(2)}`, 175, yPos);
  yPos += 7;

  doc.text('Syndicate Discount', 122, yPos);
  doc.text(`- R ${payload.discount.toFixed(2)}`, 175, yPos);
  yPos += 7;

  doc.text('Delivery', 122, yPos);
  doc.text('Free', 175, yPos);
  yPos += 5;

  doc.setDrawColor(212, 163, 89);
  doc.line(14, yPos, 196, yPos);
  yPos += 9;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Total Paid', 122, yPos);
  doc.text(`R ${payload.total.toFixed(2)}`, 175, yPos);

  // Footer Banner
  doc.setFillColor(18, 14, 12);
  doc.rect(0, 268, 210, 29, 'F');
  doc.setTextColor(230, 230, 230);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Zebediela, Limpopo • Cape Town, South Africa', 105, 279, { align: 'center' });
  doc.setTextColor(212, 163, 89);
  doc.text('Thank you for supporting Nyüku South Africa. Every piece reflects the grind behind it.', 105, 286, { align: 'center' });

  doc.save(`Nyuku-Receipt-${orderId}.pdf`);
};

export const processSimulatedCheckout = async (payload: CheckoutPayload) => {
  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  const dateStamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const orderId = `NYK-${dateStamp}-${randomCode}`;
  const recipientEmail = payload.customerEmail?.trim() || DEFAULT_FALLBACK_EMAIL;

  // 1. Download branded PDF receipt immediately
  await generateAndDownloadReceiptPDF(
    { ...payload, customerEmail: recipientEmail },
    orderId
  );

  // 2. Build clean HTML table rows matching the receipt layout
  const orderItemsHtml = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e6dfd3; font-size: 14px; color: #1c1917;">
          <strong>${item.product.title}</strong><br/>
          <span style="font-size: 12px; color: #78716c;">Size: ${item.size}</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e6dfd3; text-align: center; font-size: 14px; color: #1c1917;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e6dfd3; text-align: right; font-size: 14px; font-weight: 600; color: #1c1917;">
          ${item.product.price}
        </td>
      </tr>`
    )
    .join('');

  // 3. Send rich HTML confirmation email via EmailJS
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      to_email: recipientEmail,
      customer_name: payload.customerName,
      order_id: orderId,
      delivery_window: payload.deliveryWindow,
      order_items_html: orderItemsHtml,
      subtotal: `R ${payload.subtotal.toFixed(2)}`,
      discount: `- R ${payload.discount.toFixed(2)}`,
      total_paid: `R ${payload.total.toFixed(2)}`,
      store_url: window.location.origin,
    },
    EMAILJS_PUBLIC_KEY
  );

  return orderId;
};