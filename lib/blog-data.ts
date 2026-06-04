export const IMG1 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg'
export const IMG2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'
export const IMG3 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In'
export const IMG4 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA'

export interface Post {
  slug: string
  cat: string
  title: string
  excerpt: string
  author: string
  role: string
  date: string
  read: string
  img: string
  featured?: boolean
  body: string
}

export const posts: Post[] = [
  {
    slug: 'website-cafe-sao-mat-khach',
    cat: 'Kinh Doanh',
    title: 'Website quán cà phê của mình bị mất khách vì 3 lỗi ngớ ngẩn này',
    excerpt: 'Hồi mới mở quán mình nghĩ chỉ cần đăng lên Facebook là đủ. Sai hoàn toàn. 6 tháng sau mới hiểu vì sao.',
    author: 'Minh Tú',
    role: 'Chủ quán cà phê · Đà Nẵng',
    date: '2 tháng 6, 2025',
    read: '7 phút',
    img: IMG3,
    featured: true,
    body: `Mình mở quán cà phê từ năm 2023. Thời điểm đó ai cũng bảo "cứ Facebook là xong, cần gì website". Mình nghe theo và cũng không suy nghĩ nhiều.

Sáu tháng đầu ổn. Nhưng qua tháng thứ 7, lượng khách mới không tăng dù mình vẫn đều đặn post Facebook. Một người bạn làm marketing ghé quán và chỉ ra ngay vấn đề.

## Lỗi 1: Không có địa chỉ trên Google Maps

Khi ai đó tìm "cà phê gần đây" trên điện thoại, quán mình không xuất hiện. Đơn giản vì mình chưa tạo Google Business Profile. Người ta lướt Facebook không phải lúc nào cũng mở ứng dụng để tìm quán — họ mở bản đồ.

Sau khi tạo profile và xác minh địa chỉ, lượng khách từ Google Maps tăng lên khoảng 30% trong vòng 2 tháng.

## Lỗi 2: Không có trang web để link vào

Facebook post rồi mất trong feed. Không có chỗ nào để khách đọc về quán một cách đầy đủ — menu, giờ mở cửa, không gian, câu chuyện. Khách muốn biết trước khi đến mà không tìm được thông tin thì họ chọn quán khác.

Website không cần phức tạp. Mình sau này làm một trang đơn giản, chỉ cần ảnh đẹp, menu, bản đồ là đủ. Tỷ lệ người xem xong rồi đến thực tế cao hơn hẳn.

## Lỗi 3: Không có cách để khách đặt bàn trước

Cuối tuần đông, khách đến rồi phải chờ, nhiều người bỏ đi. Nếu có hệ thống đặt bàn online, mình biết trước bao nhiêu chỗ cần chuẩn bị và khách cũng không phải chờ đợi.

## Bài học

Digital presence không chỉ là mạng xã hội. Google + Website + Booking system — cả 3 cái này mới là bộ ba hoàn chỉnh cho một quán muốn phát triển bền vững.

Mình không hối hận vì đã học những bài này — chỉ hối hận là học hơi muộn. Nếu bạn đang ở giai đoạn đầu, đừng lặp lại những lỗi này.`
  },
  {
    slug: 'chi-phi-website-bao-nhieu',
    cat: 'Tư Vấn',
    title: 'Thật ra website tốt cho doanh nghiệp nhỏ tốn bao nhiêu? Đây là con số thực tế năm 2025',
    excerpt: 'Mình đã hỏi 20 chủ doanh nghiệp nhỏ và tổng hợp lại. Kết quả khá bất ngờ — không đắt như nhiều người nghĩ, nhưng cũng không rẻ như "chỉ cần vài triệu".',
    author: 'Hoàng Nam',
    role: 'Tư vấn chuyển đổi số · TP.HCM',
    date: '30 tháng 5, 2025',
    read: '10 phút',
    img: IMG1,
    body: `Câu hỏi mình hay được hỏi nhất: "Website hết bao nhiêu tiền?" Sau nhiều năm tư vấn, mình đúc kết được mức chi phí thực tế.

## Nhóm 1: Website cơ bản (3–8 triệu)

Phù hợp với: Tiệm nail, quán ăn nhỏ, shop thời trang mới mở.

Bạn sẽ có: 5–7 trang tĩnh, responsive mobile, SEO cơ bản, hosting 1 năm. Thường dùng template có sẵn, không có tính năng đặt hàng hay booking.

Nhược điểm: Nhìn khá giống nhau, khó tùy chỉnh sau này, thường không có hỗ trợ kỹ thuật lâu dài.

## Nhóm 2: Website chuyên nghiệp (10–30 triệu)

Phù hợp với: Doanh nghiệp vừa, cần booking/order online, muốn nhìn khác đối thủ.

Bạn sẽ có: Thiết kế custom theo brand, CMS để tự cập nhật nội dung, tích hợp thanh toán, tốc độ tải tốt.

Đây là khoảng giá mình hay khuyến nghị cho SME. ROI thường rõ ràng trong 3–6 tháng.

## Nhóm 3: Website enterprise (30 triệu+)

Phù hợp với: Doanh nghiệp lớn, e-commerce quy mô, cần tích hợp ERP/CRM.

## Cái bẫy phổ biến nhất

"Mua rẻ rồi nâng cấp sau" — nghe có lý nhưng thực tế là nâng cấp từ website rẻ tiền thường tốn nhiều hơn làm lại từ đầu. Vì nền tảng không phù hợp, phải bỏ hết.

Lời khuyên thực tế: Đặt câu hỏi bạn cần gì trong 2 năm tới, rồi chọn gói phù hợp. Đừng tối ưu cho hôm nay mà quên ngày mai.`
  },
  {
    slug: 'seo-cho-quan-an-dia-phuong',
    cat: 'SEO',
    title: 'SEO Local cho quán ăn: Tất cả những gì mình học được sau 2 năm tự mày mò',
    excerpt: 'Từ vị trí số 20 trên Google Maps đến top 3 — không cần thuê agency, không cần biết code. Chỉ cần kiên trì và đúng hướng.',
    author: 'Thu Hà',
    role: 'Chủ nhà hàng · Hà Nội',
    date: '27 tháng 5, 2025',
    read: '12 phút',
    img: IMG3,
    body: `Hai năm trước mình bắt đầu quan tâm đến SEO local sau khi để ý rằng quán ăn cạnh nhà mình — nhỏ hơn, ít ngon hơn — lại đông khách hơn chỉ vì họ xuất hiện đầu tiên trên Google.

## Bước 1: Google Business Profile là tất cả

Đây là nền tảng. Nếu bạn chưa có hoặc chưa xác minh, đừng làm gì khác trước. Điền đầy đủ mọi thứ: giờ mở cửa, số điện thoại, website, ảnh thật (không phải ảnh stock), danh mục chính xác.

Cập nhật ảnh ít nhất 2 lần/tuần — Google thích tín hiệu hoạt động.

## Bước 2: Đánh giá là vũ khí

Rating 4.2 → 4.7 sau 8 tháng. Cách làm: sau mỗi bữa ăn ngon, nhắn khách nhờ để lại đánh giá thật. Đừng mua đánh giá — Google phát hiện và phạt rất nặng.

Quan trọng hơn: trả lời MỌI đánh giá, kể cả đánh giá 1 sao. Cách bạn xử lý phàn nàn công khai nói lên rất nhiều về doanh nghiệp.

## Bước 3: Keyword địa phương trong tên và mô tả

Đừng chỉ ghi "Nhà hàng ABC". Hãy ghi "Nhà hàng ABC — Bún bò Huế ngon nhất Hoàn Kiếm" nếu đó là sự thật. Google đọc tên và mô tả của bạn.

## Bước 4: Citations — nhất quán ở mọi nơi

Tên, địa chỉ, số điện thoại phải giống nhau 100% trên Google, Facebook, website, Foody, Now. Sự không nhất quán làm Google mất tin tưởng.

## Kết quả thực tế của mình

Tháng 1: vị trí 18. Tháng 4: vị trí 7. Tháng 9: vị trí 3 cho keyword "bún bò Hoàn Kiếm". Lượt gọi từ Google tăng 4 lần.

Không có bí quyết thần kỳ. Chỉ là làm đúng những thứ cơ bản, kiên trì hơn đối thủ.`
  },
  {
    slug: 'ai-thay-designer-chua',
    cat: 'Công Nghệ',
    title: 'AI có thay được designer không? Ý kiến thật của mình sau khi dùng thử 8 công cụ',
    excerpt: 'Mình dành 3 tuần thử nghiệm nghiêm túc. Câu trả lời không phải "có" hay "không" mà là "còn tuỳ".',
    author: 'Phúc Designer',
    role: 'UI/UX Designer · Freelance',
    date: '24 tháng 5, 2025',
    read: '15 phút',
    img: IMG2,
    body: `Mình là designer 6 năm kinh nghiệm. Khi AI design tools bùng nổ, mình quyết định thử nghiệm nghiêm túc thay vì chỉ đọc tin tức.

## Những gì AI làm TỐT

**Tạo ý tưởng ban đầu**: Midjourney, Ideogram — xuất sắc. Trong 5 phút có thể có 20 hướng moodboard khác nhau. Việc này trước đây mất nửa ngày.

**Tái tạo asset**: Resize, background removal, upscale — AI gần như hoàn hảo. Mình tiết kiệm 2–3 giờ/ngày nhờ mấy cái này.

**UI component cơ bản**: Với Figma AI và Galileo, tạo wireframe nhanh hơn 60%. Nhưng chất lượng còn khá generic.

## Những gì AI làm KÉM

**Hiểu brief**: Client bảo "cần cảm giác sang trọng nhưng gần gũi" — AI không hiểu. Nó cần hướng dẫn cực kỳ cụ thể và chi tiết, đôi khi mất công hơn tự làm.

**Brand consistency**: Giữ đúng style, màu sắc, tone across nhiều materials — AI vẫn drift rất nhiều.

**Strategic thinking**: Tại sao đặt CTA ở đây? Tại sao dùng màu này? AI không biết hỏi những câu hỏi đúng.

## Kết luận thực tế

AI không thay designer. Nhưng designer không biết dùng AI sẽ bị thay bởi designer biết dùng AI.

Hiện tại mình dùng AI để làm 40% công việc lặp lại, dành 60% thời gian còn lại cho thinking và strategy. Output tốt hơn, nhanh hơn.`
  },
  {
    slug: 'sai-lam-khi-lam-web-lan-dau',
    cat: 'Kinh Nghiệm',
    title: '7 sai lầm mình mắc phải khi làm website lần đầu (và cách tránh)',
    excerpt: 'Mất 3 tháng và 15 triệu để học được những bài học này. Chia sẻ để bạn khỏi đi vào vết xe đổ.',
    author: 'Quốc Bảo',
    role: 'Chủ cửa hàng thời trang · Hà Nội',
    date: '21 tháng 5, 2025',
    read: '9 phút',
    img: IMG4,
    body: `Năm 2022 mình tự mình làm website đầu tiên cho shop thời trang. Kết quả: 3 tháng, 15 triệu đồng, và website dùng được 6 tháng thì phải làm lại. Đây là 7 điều mình làm sai.

## 1. Thuê rẻ nhất có thể

Freelancer 2 triệu. Nhận bàn giao sau 2 tháng thay vì 3 tuần, thiếu nhiều tính năng đã thỏa thuận, và người đó sau đó mất liên lạc. Tiết kiệm 3 triệu nhưng mất 2 tháng và phải thuê người khác fix.

## 2. Không có hợp đồng rõ ràng

Thỏa thuận qua Messenger. Khi tranh chấp không có gì để tham chiếu. Bài học: dù nhỏ đến đâu, phải có văn bản ghi rõ deliverables, timeline, payment terms.

## 3. Chọn platform sai

Dùng Wix vì nghe nói dễ. Sau 6 tháng khi cần tính năng phức tạp hơn, không migrate được. Mất toàn bộ nội dung đã tạo.

## 4. Không nghĩ đến mobile

Thiết kế trên máy tính, trông đẹp. Nhìn trên điện thoại thì vỡ layout. 80% khách của mình dùng điện thoại.

## 5. Ảnh sản phẩm chất lượng thấp

Tiết kiệm tiền chụp ảnh, dùng ảnh tự chụp bằng điện thoại trong điều kiện ánh sáng kém. Sau này thuê photographer 2 buổi, tỷ lệ mua tăng 35%.

## 6. Không đo lường gì cả

Không cài Google Analytics. Không biết khách đến từ đâu, trang nào họ rời đi, conversion rate là bao nhiêu.

## 7. Nghĩ xong là xong

Website không phải làm một lần rồi bỏ đó. Cần cập nhật nội dung, tối ưu liên tục, thêm tính năng theo nhu cầu.`
  },
  {
    slug: 'landing-page-tang-don-hang',
    cat: 'Marketing',
    title: 'Landing page đơn giản tăng đơn hàng 60% — đây là cái mình đã làm',
    excerpt: 'Không cần thiết kế phức tạp. Chỉ cần hiểu tâm lý khách hàng và 5 yếu tố quan trọng trên màn hình đầu tiên.',
    author: 'Lan Anh',
    role: 'Owner · Shop mỹ phẩm handmade',
    date: '18 tháng 5, 2025',
    read: '8 phút',
    img: IMG1,
    body: `Shop mình bán mỹ phẩm handmade từ thiên nhiên. Trước đây chủ yếu bán qua Facebook, tỷ lệ chuyển đổi khoảng 1.2%. Sau khi tạo landing page riêng, tỷ lệ này lên 1.9% — tăng gần 60%.

## 5 yếu tố trên màn hình đầu tiên

**Hero message rõ ràng**: Đừng viết "Mỹ phẩm thiên nhiên cao cấp". Hãy viết "Da nhạy cảm không phản ứng với hóa chất? Bộ skincare từ 100% thực vật Việt Nam". Nói thẳng vào vấn đề khách đang gặp.

**Social proof ngay bên dưới**: Không phải cuối trang. Ngay bên dưới headline. "2.847 khách hàng đã dùng · 4.9⭐ trên 1,200 đánh giá".

**Một CTA duy nhất**: Không có 3-4 nút. Chỉ 1. "Thử bộ dưỡng da 7 ngày — miễn phí ship".

**Ảnh người thật dùng sản phẩm**: Không phải ảnh studio. Ảnh khách hàng chụp tại nhà convert tốt hơn nhiều.

**Đảm bảo rủi ro thấp**: "Không hợp da đổi lại trong 30 ngày". Xóa bỏ nỗi sợ mua nhầm.

## Điều mình không ngờ

Phần testimonial với ảnh mặt khách hàng thật (có xin phép) tăng thời gian ở trang lên 40% và giảm bounce rate từ 67% xuống 45%.

Đừng overthink design. Hãy overthink copy và trust signals.`
  },
  {
    slug: 'web-nha-hang-can-gi',
    cat: 'Thiết Kế',
    title: 'Website nhà hàng cần những gì? Hỏi 50 khách hàng và đây là câu trả lời',
    excerpt: 'Menu, ảnh món ăn, địa chỉ — ai cũng biết. Nhưng có 3 thứ ít ai để ý mà lại quyết định khách có đặt bàn không.',
    author: 'Hoàng Phúc',
    role: 'F&B Consultant · TP.HCM',
    date: '15 tháng 5, 2025',
    read: '7 phút',
    img: IMG3,
    body: `Mình khảo sát 50 người trước khi đặt bàn nhà hàng, hỏi họ tìm kiếm gì trên website. Kết quả có vài điều bất ngờ.

## Top 5 điều họ tìm kiếm

1. **Giờ mở cửa** (92%) — Tưởng hiển nhiên nhưng 30% nhà hàng không có hoặc không cập nhật.
2. **Bản đồ và hướng dẫn đi** (88%) — Không chỉ địa chỉ, cần link Google Maps và chỉ dẫn đỗ xe.
3. **Giá menu** (76%) — Nhiều nhà hàng sợ khách thấy giá rồi bỏ đi. Thực ra thiếu giá mới làm khách bỏ đi.
4. **Ảnh không gian** (71%) — Nhiều hơn ảnh món ăn. Người ta muốn biết họ sẽ ngồi ở đâu.
5. **Chính sách đặt bàn** (65%) — Đặt tối thiểu bao nhiêu người? Cần đặt cọc không?

## 3 thứ ít ai làm nhưng rất hiệu quả

**Story ngắn về nhà hàng**: 2–3 câu về lý do ra đời, triết lý nấu ăn. Kết nối cảm xúc trước khi khách đến.

**Cập nhật menu theo mùa**: Khách quay lại ghé website để xem có món mới không. Nếu menu không đổi 2 năm, họ không có lý do ghé lại.

**Form đặt bàn simple**: Tên + SĐT + ngày + giờ + số người. Đừng hỏi quá nhiều — mỗi trường thêm làm giảm 10–15% tỷ lệ hoàn thành.`
  },
  {
    slug: 'chuyen-doi-so-smb',
    cat: 'Kinh Doanh',
    title: 'Chuyển đổi số cho doanh nghiệp vừa và nhỏ: bắt đầu từ đâu khi ngân sách chỉ có 10 triệu?',
    excerpt: 'Budget eo hẹp không có nghĩa là không làm được. Thứ tự ưu tiên quan trọng hơn số tiền.',
    author: 'Minh Đức',
    role: 'SME Advisor · Đà Nẵng',
    date: '12 tháng 5, 2025',
    read: '11 phút',
    img: IMG2,
    body: `Khi tư vấn cho doanh nghiệp nhỏ, câu hỏi phổ biến nhất là "chuyển đổi số bắt đầu từ đâu?" — và câu trả lời luôn là: từ vấn đề lớn nhất, không phải công cụ hay nhất.

## Bước 1: Xác định điểm đau (tuần 1–2, 0 đồng)

Trước khi mua bất kỳ phần mềm nào, ngồi xuống liệt kê 5 việc đang tốn nhiều thời gian nhất. Đối với phần lớn SME Việt Nam:
- Quản lý đơn hàng qua Zalo/Messenger thủ công
- Tổng kết doanh thu cuối ngày bằng Excel
- Không biết khách hàng đến từ kênh nào

## Bước 2: Địa chỉ online cơ bản (2–3 triệu)

Website đơn giản + Google Business Profile. Đây là nền tảng. Không có địa chỉ online, mọi thứ khác vô nghĩa.

## Bước 3: Quản lý bán hàng (2–4 triệu/năm)

KiotViet hoặc Sapo — đủ cho 80% SME. Quản lý kho, POS, báo cáo cơ bản. Đừng mua phần mềm enterprise khi bạn còn là doanh nghiệp nhỏ.

## Bước 4: Kết nối kênh bán (còn lại)

Shopee/Lazada nếu bán hàng tiêu dùng. Zalo OA cho khách hàng thân thiết. Facebook/Instagram cho nhận diện thương hiệu.

## Quan trọng nhất

Dùng 1 công cụ thật tốt còn hơn 5 công cụ nửa vời. Chuyển đổi số không phải cuộc đua mua phần mềm — là thay đổi cách vận hành.`
  },
  {
    slug: 'mau-web-nao-ban-chay',
    cat: 'Case Study',
    title: 'Case study: Thay mẫu website, doanh thu tăng 40% trong 2 tháng',
    excerpt: 'Khách hàng của mình — quán trà sữa ở Đà Nẵng — chỉ đổi giao diện và thêm chức năng đặt hàng online. Kết quả ngoài mong đợi.',
    author: 'Vaitech Team',
    role: 'Product Team',
    date: '9 tháng 5, 2025',
    read: '8 phút',
    img: IMG4,
    body: `Đây là câu chuyện thật của một khách hàng của Vaitech — quán trà sữa tại Đà Nẵng đã hoạt động 3 năm.

## Tình trạng ban đầu

Website cũ làm năm 2021, template WordPress miễn phí. Tốc độ tải 6.2 giây. Mobile score 34/100. Không có tính năng đặt hàng online. Doanh thu online gần như bằng 0.

## Những gì chúng tôi thay đổi

**Giao diện mới**: Ảnh sản phẩm được chụp lại chuyên nghiệp. Layout đặt ảnh món uống làm trung tâm, không phải text. Màu sắc đồng bộ với brand thực tế của quán.

**Tốc độ**: Từ 6.2s xuống còn 0.9s. Đây là thay đổi lớn nhất về mặt kỹ thuật.

**Đặt hàng online**: Tích hợp menu, giỏ hàng, chọn nhận tại quán hoặc giao hàng. Kết nối Giao Hàng Nhanh.

**Đánh giá khách hàng**: Hiển thị 12 review thật từ Google, kết hợp số điện thoại xác thực.

## Kết quả sau 60 ngày

- Đơn hàng online: từ ~5/tuần lên ~47/tuần
- Tỷ lệ đặt hàng repeat: 34%
- Doanh thu tổng tăng 40%
- Bounce rate giảm từ 71% xuống 38%

## Bài học

Đôi khi không cần làm marketing phức tạp. Chỉ cần trang web hoạt động đúng cách, đủ nhanh, đủ rõ ràng, có chỗ để người ta mua hàng — kết quả tự đến.`
  },
  {
    slug: 'toc-do-web-quan-trong',
    cat: 'Kỹ Thuật',
    title: 'Tốc độ website ảnh hưởng thế nào đến doanh thu? Số liệu từ 100 website Việt Nam',
    excerpt: 'Mỗi giây chậm hơn mất bao nhiêu % khách? Dữ liệu thực tế từ các website mình đã audit.',
    author: 'Tuấn Dev',
    role: 'Frontend Engineer · Vaitech',
    date: '6 tháng 5, 2025',
    read: '6 phút',
    img: IMG1,
    body: `Trong 2 năm qua mình audit tốc độ cho hơn 100 website doanh nghiệp nhỏ và vừa tại Việt Nam. Đây là những con số thực tế.

## Thực trạng đáng lo

Trung bình website SME Việt Nam tải trong 4.8 giây trên mobile. Google khuyến nghị dưới 3 giây. Chỉ 23% trong số 100 website đạt chuẩn này.

## Correlation giữa tốc độ và bounce rate

- Tải dưới 1s: bounce rate trung bình 32%
- 1–3s: bounce rate 45%
- 3–5s: bounce rate 61%
- Trên 5s: bounce rate 78%

Nói cách khác: website tải 5 giây mất gần 2.5 lần nhiều khách hơn website tải 1 giây.

## Nguyên nhân phổ biến nhất

1. **Ảnh không nén** (67% website): Ảnh 5MB được dùng trực tiếp. Nén xuống còn 200KB không ảnh hưởng chất lượng hiển thị nhưng giảm tải 95%.

2. **Hosting quá rẻ** (45%): Shared hosting giá 200k/năm thường có server response time > 1s. Ngưỡng lành mạnh là dưới 200ms.

3. **Không dùng CDN** (78%): Đặc biệt quan trọng với ảnh và video.

4. **Không lazy load** (55%): Tải tất cả ảnh cùng lúc dù khách chưa scroll tới.

## Cách fix đơn giản nhất

Bắt đầu từ ảnh. Dùng TinyPNG nén tất cả ảnh trước khi upload. Miễn phí, không cần biết code, có thể tiết kiệm 2–3 giây ngay.`
  },
  {
    slug: 'khach-hang-bo-gio-hang',
    cat: 'E-Commerce',
    title: '70% khách bỏ giỏ hàng — và đây là lý do thật sự (không phải giá)',
    excerpt: 'Phân tích hành vi người dùng trên 30 website thương mại điện tử Việt Nam. Nguyên nhân số 1 không phải là giá cao.',
    author: 'Lan Phương',
    role: 'UX Researcher · TP.HCM',
    date: '3 tháng 5, 2025',
    read: '9 phút',
    img: IMG2,
    body: `Mình vừa hoàn thành nghiên cứu 3 tháng về hành vi bỏ giỏ hàng trên 30 website e-commerce Việt Nam với tổng cộng hơn 15,000 phiên mua hàng được quan sát.

## Top 5 lý do bỏ giỏ hàng thực tế

**1. Phí ship bất ngờ (38%)**: Khách thêm vào giỏ hàng, đến bước cuối mới thấy phí ship 35,000đ. Họ cảm thấy bị lừa dù phí đó hoàn toàn hợp lý. Fix: hiển thị phí ship sớm nhất có thể, tốt nhất là ngay trên trang sản phẩm.

**2. Buộc tạo tài khoản (26%)**: Nhiều người chỉ muốn mua 1 lần. Buộc họ tạo account là rào cản lớn. Fix: thêm option "Mua không cần đăng ký".

**3. Thanh toán phức tạp (19%)**: Form quá nhiều trường, không hỗ trợ thanh toán quen thuộc. Fix: tích hợp MoMo/ZaloPay, giảm số trường cần điền.

**4. Website quá chậm (11%)**: Đặc biệt ở bước checkout. Mỗi giây delay ở bước này, 7% người dùng bỏ đi.

**5. Không tin tưởng (6%)**: Không có HTTPS, không có chính sách đổi trả rõ ràng.

## Điều thú vị nhất

Giá cao chỉ chiếm chưa đến 5% lý do bỏ giỏ hàng. Đa số vấn đề là về UX và quy trình mua hàng — hoàn toàn có thể fix được mà không cần giảm giá.`
  },
  {
    slug: 'responsive-design-2025',
    cat: 'Thiết Kế',
    title: 'Mobile-first không còn là xu hướng, nó là bắt buộc — đây là dữ liệu chứng minh',
    excerpt: '73% traffic website Việt Nam đến từ điện thoại. Nếu web bạn không đẹp trên mobile, bạn đang mất hơn nửa khách hàng.',
    author: 'Hà Linh',
    role: 'Design Lead · Vaitech',
    date: '30 tháng 4, 2025',
    read: '5 phút',
    img: IMG1,
    body: `Mình vừa tổng hợp dữ liệu từ Google Analytics của 45 website khách hàng trong quý 1/2025. Con số rõ ràng hơn bao giờ hết.

## Con số thực tế

- Mobile: 73.2% tổng traffic
- Desktop: 24.1%
- Tablet: 2.7%

Trong đó, nhóm 18–35 tuổi: mobile chiếm đến 84%.

## Hệ quả khi website không tối ưu mobile

Website được thiết kế cho desktop, nhìn ổn trên máy tính nhưng trên điện thoại: text quá nhỏ, nút quá gần nhau, cần zoom để đọc. Bounce rate của nhóm này cao hơn 40–60% so với desktop.

## Mobile-first không chỉ là thu nhỏ màn hình

Đây là hiểu lầm phổ biến nhất. Mobile-first nghĩa là:

- **Ưu tiên nội dung**: Trên mobile, không có chỗ cho mọi thứ. Bắt buộc phải chọn lọc cái quan trọng nhất.
- **Touch targets đủ lớn**: Nút tối thiểu 44x44px để ngón tay có thể bấm thoải mái.
- **Font size ít nhất 16px**: Nhỏ hơn thì người dùng phải zoom, Google cũng không thích.
- **Tốc độ ưu tiên**: 4G không phải lúc nào cũng ổn định. Website cần hoạt động tốt ngay cả với 3G.

## Kiểm tra ngay

Mở Google Search Console → Core Web Vitals → lọc theo Mobile. Nếu bạn thấy nhiều URL bị "Poor", đó là vấn đề cần xử lý ngay.`
  },
  {
    slug: 'google-analytics-co-ban',
    cat: 'Marketing',
    title: 'Google Analytics 4 cho người không biết IT: Chỉ cần xem 5 con số này là đủ',
    excerpt: 'GA4 nhìn có vẻ phức tạp nhưng thực ra chủ kinh doanh chỉ cần quan tâm đến vài chỉ số. Mình giải thích bằng tiếng Việt thuần.',
    author: 'Quỳnh Anh',
    role: 'Digital Marketing · Hà Nội',
    date: '27 tháng 4, 2025',
    read: '8 phút',
    img: IMG3,
    body: `GA4 khó hơn Universal Analytics cũ. Nhiều chủ doanh nghiệp cài xong rồi... không bao giờ mở lại vì quá rối. Mình sẽ giúp bạn chỉ xem 5 con số thực sự quan trọng.

## Số 1: Users (Người dùng)

Có bao nhiêu người thực tế truy cập website trong kỳ. Đây là "sức khỏe" tổng thể. Xu hướng quan trọng hơn con số tuyệt đối — tháng này so với tháng trước thế nào?

## Số 2: Engagement Rate (Tỷ lệ tương tác)

GA4 thay bounce rate bằng cái này. Engagement rate cao (>60%) nghĩa là khách đang đọc và tương tác. Thấp (<40%) — nội dung hoặc thiết kế có vấn đề.

## Số 3: Average Engagement Time (Thời gian tương tác trung bình)

Khách ở lại bao lâu? Dưới 30 giây thường là dấu hiệu không tốt. Trên 2 phút là rất tốt cho most use cases.

## Số 4: Top Pages (Trang được xem nhiều nhất)

Trang nào khách vào nhiều nhất? Trang nào họ rời đi nhiều nhất? Tối ưu trang exit nhiều là nơi bắt đầu tốt.

## Số 5: Traffic Sources (Nguồn traffic)

Khách đến từ đâu? Google Search, Facebook, Direct, Referral? Biết cái này để biết đang bỏ công sức đúng chỗ không.

## Tần suất xem

Tuần 1 lần là đủ cho hầu hết doanh nghiệp nhỏ. Set up một dashboard đơn giản với 5 chỉ số này, mỗi thứ Hai mở ra nhìn 5 phút.`
  },
  {
    slug: 'zalo-oa-hay-website',
    cat: 'Tư Vấn',
    title: 'Zalo OA vs Website: Cái nào phù hợp hơn cho doanh nghiệp nhỏ Việt Nam?',
    excerpt: 'Câu hỏi mình được hỏi nhiều nhất trong 2024. Câu trả lời không phải chọn 1, nhưng nếu chỉ có ngân sách cho 1 thì đây là cách quyết định.',
    author: 'Minh Tú',
    role: 'Digital Consultant · Đà Nẵng',
    date: '24 tháng 4, 2025',
    read: '10 phút',
    img: IMG4,
    body: `Câu trả lời ngắn: cả hai, nhưng không phải lúc nào cũng có ngân sách để làm cả hai tốt. Đây là framework mình dùng để tư vấn.

## Zalo OA mạnh ở đâu?

**Tiếp cận trực tiếp**: Zalo có 74 triệu người dùng Việt Nam. Khách hàng của bạn rất có thể đang dùng Zalo hàng ngày. OA giúp bạn gửi thông báo thẳng vào inbox của họ.

**Chi phí thấp**: Tạo miễn phí, gửi tin nhắn rẻ hơn SMS. Tốt cho broadcast promotion, thông báo đơn hàng.

**Tương tác 2 chiều**: Khách nhắn tin, bạn trả lời trong cùng một nền tảng.

**Nhược điểm**: Không rank được trên Google. Không sở hữu data thực sự (Zalo có thể thay đổi chính sách bất cứ lúc nào). Khó xây dựng brand premium.

## Website mạnh ở đâu?

**Tìm kiếm hữu cơ**: Người tìm "dịch vụ X tại Y" trên Google — website có thể xuất hiện, Zalo thì không.

**Uy tín và brand**: Website chuyên nghiệp tạo cảm giác tin tưởng hơn. Đặc biệt quan trọng với B2B.

**Sở hữu hoàn toàn**: Data, design, nội dung — tất cả là của bạn.

## Vậy chọn gì?

- **B2C, target 25–45 tuổi, bán hàng tiêu dùng**: Zalo OA trước, website sau.
- **B2B hoặc dịch vụ cao cấp**: Website trước, Zalo OA để nurture sau.
- **Cửa hàng địa phương muốn tăng walk-in**: Google Business Profile + website cơ bản là ưu tiên.

Lý tưởng nhất: có cả hai, dùng website để tạo first impression, Zalo để duy trì relationship.`
  },
  {
    slug: 'copywriting-website-ban-hang',
    cat: 'Marketing',
    title: 'Viết nội dung website bán hàng thế nào để khách đọc xong muốn mua ngay?',
    excerpt: 'Mình đã thử nghiệm A/B testing trên 15 website. Những thay đổi nhỏ về câu chữ tăng tỷ lệ chuyển đổi đến 45%.',
    author: 'Thu Hà',
    role: 'Copywriter · Freelance',
    date: '21 tháng 4, 2025',
    read: '11 phút',
    img: IMG2,
    body: `Sau 4 năm làm copywriter và A/B test hàng trăm variation, mình đúc kết được một số nguyên tắc thực sự có tác động.

## Nguyên tắc 1: Khách hàng không quan tâm đến bạn

Họ quan tâm đến bản thân họ. Đổi từ "Chúng tôi cung cấp..." thành "Bạn sẽ nhận được...". Nghe đơn giản nhưng 90% website vẫn đang viết theo góc nhìn của mình, không phải của khách.

## Nguyên tắc 2: Lợi ích > Tính năng

"Máy lọc nước với màng RO 7 lớp" — tính năng.
"Uống nước sạch an toàn như nước khoáng ngay tại nhà, tiết kiệm 500k/tháng" — lợi ích.

Luôn trả lời câu hỏi "So what?" sau mỗi tính năng bạn nêu.

## Nguyên tắc 3: Cụ thể luôn tốt hơn chung chung

"Giao hàng nhanh" vs "Giao trong 4 giờ tại nội thành".
"Chất lượng cao" vs "Bảo hành 3 năm, đổi mới trong 30 ngày nếu lỗi".

## Nguyên tắc 4: Xử lý phản đối trước khi khách nghĩ đến

List ra 3–5 lý do phổ biến nhất khách không mua, rồi address trực tiếp trong nội dung. Đừng đợi họ hỏi.

## Nguyên tắc 5: CTA phải nói rõ bước tiếp theo

"Liên hệ ngay" — mơ hồ.
"Gọi cho chúng tôi ngay để nhận báo giá trong 30 phút" — rõ ràng.

## Test A/B đơn giản nhất bạn có thể làm ngay

Thay đổi chữ trên nút CTA. Đây là thay đổi nhỏ nhất nhưng impact lớn nhất. Chạy 2 tuần, xem cái nào click nhiều hơn.`
  },
  {
    slug: 'seo-nganh-bds',
    cat: 'SEO',
    title: 'SEO ngành bất động sản: Tại sao keyword "nhà bán" vô nghĩa và nên làm gì thay thế',
    excerpt: 'Keyword volume lớn ≠ traffic thực tế. Chiến lược SEO đúng cho BĐS phải dựa trên search intent, không phải search volume.',
    author: 'Nam BĐS',
    role: 'Môi giới BĐS · TP.HCM',
    date: '18 tháng 4, 2025',
    read: '12 phút',
    img: IMG1,
    body: `Mình làm BĐS 5 năm và dành 2 năm thử SEO. Cái mình học được đau nhất: keyword volume lớn không có nghĩa gì nếu bạn không thể cạnh tranh.

## Tại sao "nhà bán" và "chung cư Hà Nội" gần như vô dụng?

Những keyword này có volume hàng chục nghìn lượt/tháng. Nhưng top 10 kết quả là Batdongsan.com, Nhadat.com, Mogi.vn — những tập đoàn có team SEO 50 người và domain authority 70+.

Một cá nhân hay agency nhỏ cạnh tranh trực tiếp với họ là tự làm khó mình.

## Long-tail keywords là cơ hội thực sự

"Căn hộ 2 phòng ngủ gần trường quốc tế Ciputra dưới 3 tỷ" — volume thấp hơn nhiều, nhưng:
- Người tìm keyword này biết chính xác họ muốn gì
- Cạnh tranh ít hơn nhiều lần
- Tỷ lệ chuyển đổi cao hơn 5–10 lần

## Chiến lược content hiệu quả cho BĐS cá nhân

**Hyperlocal content**: Viết về từng khu vực cụ thể bạn đang bán. "Sống ở khu đô thị Vinhomes Ocean Park có gì hay? Review thực tế sau 2 năm ở" — loại content này rank được và thu hút đúng người.

**Market update**: "Giá căn hộ quận 9 tháng 6/2025 — tổng hợp 50 giao dịch thực tế" — data độc quyền, khó ai copy được.

**FAQ người mua nhà**: "Vay ngân hàng mua nhà lần đầu cần chuẩn bị gì?" — traffic organic cao, xây dựng trust.

## Kết quả thực tế

Sau 6 tháng làm content hyperlocal, mình nhận 3–5 lead chất lượng cao từ Google mỗi tuần mà không tốn đồng quảng cáo nào.`
  },
  {
    slug: 'thiet-ke-web-khach-san',
    cat: 'Thiết Kế',
    title: 'Thiết kế website khách sạn: Ảnh đẹp thôi chưa đủ, đây là 6 thứ khách cần thấy trước khi đặt phòng',
    excerpt: 'Làm việc với 12 khách sạn trong 3 năm, mình học được rằng tỷ lệ đặt phòng trực tiếp phụ thuộc vào những thứ rất cụ thể.',
    author: 'Phúc Designer',
    role: 'Hospitality Web Designer',
    date: '15 tháng 4, 2025',
    read: '9 phút',
    img: IMG3,
    body: `Mình đã thiết kế website cho 12 khách sạn và resort. Điều mình nhận ra: website khách sạn đẹp nhưng không bán được phòng thường thiếu những thứ rất cụ thể.

## 1. So sánh giá trực tiếp với OTA

Nếu đặt trực tiếp qua website rẻ hơn Booking.com, hãy NÓI RÕ điều này. Đặt banner "Đặt trực tiếp — tiết kiệm 15% so với Booking.com" ngay trên trang chủ. Đây là động lực mạnh nhất.

## 2. Ảnh phòng từ góc nhìn thực tế

Ảnh marketing 12mm wide-angle làm phòng trông rộng gấp đôi thực tế. Khi khách đến và phòng nhỏ hơn kỳ vọng, họ viết review 1 sao. Hãy có thêm ảnh chụp bình thường, thậm chí ảnh khách thật ở trong phòng (với sự cho phép).

## 3. Chính sách hủy phòng thật rõ ràng

Câu hỏi số 1 trước khi đặt: "Nếu tôi đổi kế hoạch thì sao?" Hiển thị chính sách hủy ngay trên trang đặt phòng, không phải ẩn trong Terms & Conditions.

## 4. Tiện nghi thực tế, không phải marketing

"WiFi miễn phí" — ai cũng có rồi. Tốc độ bao nhiêu Mbps? Có phủ sóng bể bơi không? Những chi tiết nhỏ này quan trọng với người công tác hay content creator.

## 5. Khoảng cách đến điểm du lịch

Không chỉ "gần trung tâm". Hãy ghi cụ thể: "5 phút đi bộ đến Phố Cổ Hội An, 15 phút xe đến Cù Lao Chàm". Bản đồ tương tác với điểm đến xung quanh là điểm cộng lớn.

## 6. Mùa nào đẹp nhất để đến

Content này không nhiều website có. "Tháng 4–8 thời tiết đẹp nhất, tháng 10–12 có thể mưa nhưng vắng khách và giá thấp 40%" — thông tin hữu ích này xây dựng trust và giúp khách quyết định.`
  },
  {
    slug: 'chatbot-cho-web',
    cat: 'Công Nghệ',
    title: 'Chatbot AI cho website: Có đáng đầu tư không? Kinh nghiệm thực tế sau 6 tháng',
    excerpt: 'Mình thử nghiệm chatbot trên website quán ăn của người quen. Số liệu thật, không marketing.',
    author: 'Bảo Tech',
    role: 'Product Manager · Startup SaaS',
    date: '12 tháng 4, 2025',
    read: '8 phút',
    img: IMG4,
    body: `Người quen mình có quán ăn tại Hà Nội. Tháng 10/2024 mình giúp họ thử nghiệm chatbot AI trên website. Đây là kết quả thực tế sau 6 tháng.

## Setup ban đầu

Dùng Tidio với AI training từ dữ liệu menu, giờ mở cửa, FAQ. Chi phí khoảng 500k/tháng. Thời gian setup: 2 buổi chiều.

## Những gì chatbot làm tốt

**Trả lời ngoài giờ**: 40% câu hỏi đến sau 22h khi nhân viên đã về. Trước đây những câu hỏi này không được trả lời, nhiều khách tìm quán khác. Sau khi có chatbot, response rate ngoài giờ từ 0% lên 87%.

**FAQ lặp lại**: "Có chỗ đậu xe không?", "Có nhận đặt bàn không?", "Menu có món chay không?" — những câu này chiếm 60% cuộc trò chuyện và chatbot xử lý hoàn toàn tự động.

**Giảm tải cho nhân viên**: Nhân viên phục vụ không còn phải dừng công việc để trả lời tin nhắn liên tục.

## Những gì chatbot làm kém

**Complaint handling**: Khách phàn nàn về chất lượng món ăn — chatbot không có khả năng xoa dịu cảm xúc. Cần nhân viên thật.

**Đặt hàng phức tạp**: Đặt tiệc 30 người với yêu cầu đặc biệt — chatbot fail ngay.

**Nuance**: "Bàn đẹp nhất để hẹn hò là bàn nào?" — chatbot trả lời được nhưng không tốt.

## Verdict

Với nhà hàng/quán ăn quy mô nhỏ: đáng đầu tư nếu bạn nhận nhiều tin nhắn ngoài giờ. Không phải silver bullet, nhưng giải quyết được vấn đề cụ thể với chi phí hợp lý.`
  },
  {
    slug: 'thu-thap-email-khach-hang',
    cat: 'Marketing',
    title: 'Xây dựng danh sách email từ website: Từ 0 lên 1000 subscriber trong 3 tháng không tốn đồng nào',
    excerpt: 'Email marketing vẫn là kênh ROI cao nhất. Bài này mình chia sẻ cụ thể những gì mình đã làm.',
    author: 'Lan Anh',
    role: 'Growth Marketer · TP.HCM',
    date: '9 tháng 4, 2025',
    read: '10 phút',
    img: IMG2,
    body: `Email marketing vẫn có ROI trung bình 36:1 — tức là mỗi 1 đồng bỏ ra thu về 36 đồng. Nhưng trước tiên bạn cần có danh sách email. Đây là cách mình xây từ 0 lên 1000 subscriber trong 3 tháng.

## Lead magnet là chìa khóa

Không ai tự nguyện cho email nếu không có lý do. Bạn cần "lead magnet" — thứ gì đó có giá trị mà khách muốn đủ để đổi bằng email.

Với shop mỹ phẩm handmade của mình: "Cẩm nang chăm sóc da nhạy cảm — 7 nguyên liệu tự nhiên bạn nên tránh" — PDF 8 trang, làm mất 1 buổi chiều, nhưng đổi lại được 847 email trong 3 tháng đầu.

## Placement quan trọng hơn design

Popup sau 30 giây hoặc khi scroll 50% trang hiệu quả hơn nhiều so với form tĩnh ở footer. Test cho thấy popup tăng conversion 3–5 lần.

Nhưng đừng spam popup. Chỉ hiện 1 lần/visit, delay đủ để khách đọc nội dung trước.

## Confirmation email phải thật hay

Email xác nhận sau khi đăng ký thường bị bỏ qua. Mình biến nó thành content đầu tiên — giới thiệu về thương hiệu, kể câu chuyện tại sao mình bắt đầu, và link ngay đến lead magnet.

Open rate email này đạt 68% so với trung bình ngành là 21%.

## Đừng email quá nhiều

Sau khi có list, nhiều người excited rồi spam subscriber. Mình gửi 2 lần/tuần: thứ Ba là content giáo dục, thứ Sáu là offer/product. Unsubscribe rate dưới 0.3%.`
  },
  {
    slug: 'web-phong-kham-toi-uu',
    cat: 'Case Study',
    title: 'Tối ưu website phòng khám: Giảm bounce rate từ 78% xuống 32% bằng 4 thay đổi nhỏ',
    excerpt: 'Phòng khám da liễu tại Hà Nội. Không thay design lớn, chỉ điều chỉnh 4 điểm. Kết quả sau 6 tuần.',
    author: 'Tuấn Dev',
    role: 'Web Optimizer · Vaitech',
    date: '6 tháng 4, 2025',
    read: '7 phút',
    img: IMG1,
    body: `Phòng khám da liễu này có website 2 năm tuổi, traffic ổn (~2000 visits/tháng) nhưng bounce rate 78% và gần như không có lịch hẹn online. Đây là 4 thay đổi nhỏ mình thực hiện.

## Thay đổi 1: Số điện thoại ở header

Website cũ không có số điện thoại trên navbar. Phải scroll xuống footer mới thấy. Đơn giản thêm số điện thoại click-to-call vào header.

Kết quả: cuộc gọi từ website tăng 180%.

## Thay đổi 2: Thay ảnh stock bằng ảnh thật

Trang About và trang dịch vụ dùng ảnh stock của bác sĩ và thiết bị. Mình chụp lại bằng điện thoại có ánh sáng tốt — bác sĩ thật, phòng khám thật, thiết bị thật.

Kết quả: Thời gian trung bình trên trang About tăng từ 42 giây lên 2 phút 18 giây.

## Thay đổi 3: Nút đặt lịch trên mọi trang

Nút đặt lịch chỉ có trên trang chủ. Thêm vào tất cả trang dịch vụ, trang bác sĩ, trang liên hệ.

Kết quả: Form đặt lịch tăng 320%.

## Thay đổi 4: FAQ trước khi đặt lịch

Nhiều bệnh nhân muốn đặt nhưng còn thắc mắc về quy trình, giá, bảo hiểm y tế. Thêm FAQ 8 câu ngay trước form đặt lịch.

Kết quả: Bounce rate tại trang đặt lịch giảm từ 65% xuống 28%.

## Tổng kết sau 6 tuần

Bounce rate tổng: 78% → 32%. Lịch hẹn online: 3/tuần → 19/tuần. Không thay đổi design lớn, không tốn tiền quảng cáo.`
  },
  {
    slug: 'typography-trong-thiet-ke',
    cat: 'Thiết Kế',
    title: 'Typography trong thiết kế web: Tại sao font chữ ảnh hưởng đến niềm tin của khách hàng',
    excerpt: 'Một nghiên cứu cho thấy 94% ấn tượng đầu tiên về website đến từ thiết kế, không phải nội dung. Và font chữ là phần quan trọng nhất.',
    author: 'Hà Linh',
    role: 'Brand Designer · Vaitech',
    date: '3 tháng 4, 2025',
    read: '6 phút',
    img: IMG3,
    body: `Có một thử nghiệm tâm lý học: người ta được cho đọc cùng một nội dung với font chữ khác nhau và được hỏi mức độ tin tưởng. Kết quả chênh lệch đến 20%.

## Font chữ truyền thông điệp gì?

**Serif fonts** (Times New Roman, Playfair Display): Truyền thống, uy tín, cao cấp. Phù hợp với luật sư, ngân hàng, tạp chí cao cấp, nhà hàng fine dining.

**Sans-serif fonts** (Inter, Helvetica, DM Sans): Hiện đại, sạch sẽ, dễ đọc. Phù hợp với tech startup, healthcare, e-commerce, dịch vụ chuyên nghiệp.

**Display/Decorative fonts**: Cá tính, sáng tạo, nhớ được. Phù hợp với brand cá nhân, sản phẩm lifestyle, entertainment. Nhưng chỉ dùng cho heading, không bao giờ dùng cho body text.

## Quy tắc cơ bản

**Tối đa 2 font trong 1 website**: 1 cho heading (thường là font có cá tính hơn), 1 cho body text (ưu tiên readability).

**Body text tối thiểu 16px**: Đặc biệt trên mobile. Nhỏ hơn làm người dùng mỏi mắt và phải zoom.

**Line height 1.5–1.7**: Không phải 1 hay 2. Vùng 1.5–1.7 dễ đọc nhất cho paragraph dài.

**Contrast đủ cao**: Chữ màu xám nhạt trên nền trắng nhìn "nghệ" nhưng khó đọc. Accessibility guidelines yêu cầu contrast ratio ít nhất 4.5:1.

## Font miễn phí tốt nhất cho website Việt Nam

Inter (body text), Montserrat (heading) — đây là cặp đôi mình dùng nhiều nhất, đẹp với cả tiếng Việt có dấu.`
  },
  {
    slug: 'nextjs-cho-web-viet-nam',
    cat: 'Kỹ Thuật',
    title: 'Tại sao Vaitech chọn Next.js thay vì WordPress? Góc nhìn từ người làm kỹ thuật',
    excerpt: 'WordPress vẫn là lựa chọn phổ biến nhưng có những giới hạn mà doanh nghiệp tăng trưởng nhanh sẽ gặp phải. Đây là lý do chúng tôi chọn hướng khác.',
    author: 'Vaitech Engineering',
    role: 'Tech Team · Vaitech',
    date: '25 tháng 3, 2025',
    read: '10 phút',
    img: IMG1,
    body: `Mình không anti-WordPress. Với 43% internet dùng WordPress, đây là platform cực kỳ mature và có ecosystem khổng lồ. Nhưng sau 3 năm làm website cho nhiều loại doanh nghiệp, đây là lý do mình chọn Next.js cho các dự án mới.

## Vấn đề với WordPress

**Bảo mật**: WordPress là target số 1 của hacker vì phổ biến. Trung bình có 90,000 vụ tấn công vào WordPress mỗi phút. Không quản lý update plugin cẩn thận là tự mở cửa.

**Performance**: WordPress out of the box rất chậm. Phải cài W3 Total Cache, Smush, WPML, WooCommerce... mỗi plugin thêm vào là thêm một điểm có thể fail.

**Hosting dependency**: WordPress cần PHP server, MySQL database. Hosting tốt cho WordPress không rẻ.

## Tại sao Next.js?

**Static generation**: Trang web được compile thành HTML tĩnh. Tốc độ tải cực nhanh, không cần database query mỗi request.

**Security**: Không có PHP, không có database public-facing, attack surface nhỏ hơn nhiều.

**Developer experience**: TypeScript, component-based — dễ maintain hơn về lâu dài.

**Vercel hosting**: Deploy free tier rất mạnh, CDN toàn cầu, CI/CD tự động.

## Nhưng WordPress vẫn win ở đâu?

Khi khách hàng cần tự cập nhật content thường xuyên mà không biết code — WordPress CMS vẫn user-friendly hơn. Tuy nhiên, với Headless CMS như Sanity hay Contentful kết hợp Next.js, bạn có thể có cả hai.`
  },
  {
    slug: 'review-gia-thue-web-2025',
    cat: 'Tư Vấn',
    title: 'Review các gói thuê website ở Việt Nam năm 2025: Cái nào đáng tiền?',
    excerpt: 'Mình đã thử 7 dịch vụ làm website trong 2 năm. Đây là đánh giá thật sự — cả ưu điểm lẫn nhược điểm.',
    author: 'Quốc Bảo',
    role: 'Serial Entrepreneur · Hà Nội',
    date: '22 tháng 3, 2025',
    read: '13 phút',
    img: IMG3,
    body: `Mình đã thử 7 dịch vụ làm website khác nhau trong 2 năm qua cho 3 doanh nghiệp khác nhau. Đây là đánh giá thật — không phải affiliate review.

## Nhóm DIY (tự làm) — Wix, Squarespace

**Ưu điểm**: Bắt đầu nhanh, không cần biết code, có template đẹp. Phù hợp cho portfolio cá nhân, landing page đơn giản.

**Nhược điểm**: Lock-in — khó migrate sang platform khác sau này. SEO khá hạn chế. Không flexible khi cần tính năng custom. Giá $15–25/tháng nghe rẻ nhưng cộng dồn thì không.

**Kết luận**: Ổn cho ai chỉ cần online presence cơ bản và không có kế hoạch scale.

## Nhóm WordPress agency

**Ưu điểm**: Flexible, nhiều plugin, dễ tìm developer fix lỗi. Chi phí ban đầu thường thấp hơn custom.

**Nhược điểm**: Chất lượng cực kỳ không đồng đều. Mình đã bị 2 lần nhận bàn giao website WordPress với 30+ plugin không cần thiết, tốc độ tải 8 giây.

**Kết luận**: Nếu chọn hướng này, phải hỏi kỹ về tốc độ sau khi xong, xem demo thật của các dự án trước.

## Nhóm nền tảng Việt Nam (Haravan, Sapo Web)

**Ưu điểm**: Hỗ trợ tiếng Việt tốt, tích hợp payment local sẵn, team support nội địa.

**Nhược điểm**: Giới hạn customization. Phụ thuộc vào roadmap của nhà cung cấp.

**Kết luận**: Tốt cho e-commerce đơn giản, doanh nghiệp không muốn phức tạp kỹ thuật.

## Nhóm custom development

Đắt nhất nhưng linh hoạt nhất. Thích hợp khi bạn có yêu cầu đặc thù hoặc cần tích hợp với hệ thống hiện có.

**Bài học chung**: Đừng chọn dịch vụ chỉ vì rẻ nhất. Chi phí ẩn (maintain, fix bug, redesign khi scale) thường lớn hơn nhiều.`
  },
  {
    slug: 'cta-button-hieu-qua',
    cat: 'Marketing',
    title: 'Nút CTA: Thay 2 từ này thành 2 từ khác, tỷ lệ click tăng 78%',
    excerpt: 'Không phải màu sắc, không phải vị trí — chính là text trong nút CTA. A/B test trên 5000 người dùng.',
    author: 'Quỳnh Anh',
    role: 'Growth Hacker · TP.HCM',
    date: '19 tháng 3, 2025',
    read: '5 phút',
    img: IMG4,
    body: `Mình chạy A/B test 2 tuần với 5247 người dùng trên website của khách hàng — công ty dịch vụ kế toán. Chỉ thay đổi chữ trên nút CTA. Kết quả bất ngờ.

## Control vs Variant

**Control**: "Liên hệ ngay"
**Variant**: "Nhận tư vấn miễn phí"

Tỷ lệ click: Control 2.3% — Variant 4.1%. Tăng 78%.

## Tại sao "Nhận tư vấn miễn phí" win?

**"Liên hệ ngay"**: Đặt hành động từ góc nhìn của bạn. Bạn muốn họ liên hệ. Nhưng khách không quan tâm đến điều bạn muốn.

**"Nhận tư vấn miễn phí"**: Đặt từ góc nhìn của khách. Họ sẽ nhận được gì? Buổi tư vấn. Giá bao nhiêu? Miễn phí. Câu hỏi của họ đã được trả lời trong chính nút CTA.

## Framework để viết CTA tốt hơn

Tự hỏi: "Khi click vào nút này, khách nhận được gì?" Rồi viết điều đó vào nút.

- "Đặt lịch khám" → "Đặt lịch — Xem kết quả trong 30 phút"
- "Mua ngay" → "Thêm vào giỏ — Giao trong 4 giờ"
- "Đăng ký" → "Tham gia miễn phí — Huỷ bất kỳ lúc nào"

## Những từ proven work well

- Miễn phí / Free
- Ngay bây giờ / Ngay hôm nay
- Không cần thẻ tín dụng
- Hủy bất kỳ lúc nào
- Bắt đầu trong X giây

Thêm vào đó: specificity sells. "Nhận báo giá" < "Nhận báo giá trong 2 giờ".`
  },
  {
    slug: 'bao-mat-website-co-ban',
    cat: 'Kỹ Thuật',
    title: 'Bảo mật website cơ bản cho chủ doanh nghiệp không biết IT: Checklist 10 điểm',
    excerpt: '60% website doanh nghiệp nhỏ Việt Nam bị hack mà chủ nhân không biết trong nhiều tuần. Đây là những gì cần làm ngay.',
    author: 'Tuấn Dev',
    role: 'Security Specialist · Vaitech',
    date: '16 tháng 3, 2025',
    read: '9 phút',
    img: IMG2,
    body: `Website bị hack không phải tin tức xa xôi. Mình đã giúp restore 8 website khách hàng bị tấn công trong năm 2024. Dưới đây là checklist để bảo vệ website của bạn.

## 1. HTTPS là bắt buộc

Nếu URL vẫn là http:// (không có "s"), dữ liệu của khách hàng đang được gửi không được mã hóa. Google cũng đánh dấu những site này là "Không bảo mật".

## 2. Mật khẩu mạnh cho admin

"admin/admin123" vẫn là combo phổ biến nhất bị brute force. Dùng password manager, tạo mật khẩu 20 ký tự ngẫu nhiên.

## 3. 2FA cho tài khoản admin

Xác thực 2 yếu tố. Dù ai đó có mật khẩu của bạn, họ vẫn cần điện thoại của bạn để đăng nhập.

## 4. Update thường xuyên

WordPress core, theme, plugin — update ngay khi có bản mới. 90% vụ hack khai thác lỗ hổng đã được vá trong các bản update.

## 5. Backup tự động

Backup hàng ngày, lưu ở nơi khác server chính (Google Drive, S3). Test restore mỗi tháng 1 lần.

## 6. Giới hạn login attempts

Sau 5 lần nhập sai, block IP đó 30 phút. Ngăn brute force attack.

## 7. Security headers

X-Frame-Options, Content-Security-Policy, X-XSS-Protection — những HTTP header này ngăn các loại tấn công phổ biến. Hosting tốt thường có sẵn, hoặc plugin bảo mật có thể set.

## 8. Không dùng "admin" làm username

Đây là điều tối thiểu nhất nhưng vẫn còn rất nhiều website dùng username "admin".

## 9. Xóa plugin/theme không dùng

Plugin cũ không được update là điểm yếu. Xóa hẳn, không chỉ deactivate.

## 10. Monitor activity log

Biết ai đã login, khi nào, làm gì. Nếu có điều bất thường, bạn muốn biết sớm.`
  },
  {
    slug: 'web-spa-nail',
    cat: 'Case Study',
    title: 'Xây website cho tiệm nail: Từ "chỉ có Facebook" đến 40 lịch đặt online mỗi tuần',
    excerpt: 'Câu chuyện thật từ tiệm nail ở Đà Nẵng. Đầu tư 3 triệu, thu về 15 triệu/tháng doanh thu tăng thêm.',
    author: 'Vaitech Team',
    role: 'Success Story',
    date: '13 tháng 3, 2025',
    read: '8 phút',
    img: IMG1,
    body: `Chị Hương có tiệm nail ở Đà Nẵng từ năm 2020. Thành công nhờ tay nghề tốt và review tốt trên Facebook. Nhưng vào năm 2024, chị bắt đầu gặp vấn đề: lịch hẹn qua Messenger ngày càng rối rắm, nhiều khách quên lịch hoặc hủy phút chót.

## Tình trạng ban đầu

- 100% booking qua Facebook Messenger
- Mỗi tuần thất thoát 2–3 lịch do khách quên hoặc nhầm giờ
- Không có cách nào nhắc lịch tự động
- Không biết tuần tới có bao nhiêu khách để chuẩn bị nguyên liệu

## Giải pháp đơn giản

Chúng mình build website đơn giản với:
- Trang chủ với ảnh portfolio nail (chụp thật, không stock)
- Trang dịch vụ và bảng giá rõ ràng
- Form đặt lịch online kết nối Google Calendar
- SMS nhắc lịch tự động 24h và 2h trước

Chi phí: khoảng 3 triệu đồng.

## Kết quả sau 3 tháng

**Lịch online**: Từ 0 lên 40 lịch/tuần, chiếm 65% tổng booking.

**Tỷ lệ no-show**: Giảm từ 18% xuống còn 4%. Nhắc lịch tự động làm được điều này.

**Doanh thu tăng thêm**: Ước tính 15 triệu/tháng từ lịch mới và giảm thất thoát.

**Tiết kiệm thời gian**: Chị Hương không còn phải check Messenger liên tục để xác nhận lịch.

## Bài học

Không phải cứ phải làm gì phức tạp. Đôi khi chỉ cần giải quyết đúng một vấn đề — và với tiệm nail, vấn đề đó là quản lý lịch hẹn.`
  },
  {
    slug: 'social-proof-website',
    cat: 'Marketing',
    title: 'Đặt đánh giá khách hàng ở đâu trên website thì hiệu quả nhất? Kết quả từ eyetracking study',
    excerpt: 'Không phải trang About, không phải footer. Vị trí của social proof ảnh hưởng rất lớn đến quyết định mua.',
    author: 'Lan Phương',
    role: 'Conversion Optimizer',
    date: '10 tháng 3, 2025',
    read: '7 phút',
    img: IMG3,
    body: `Mình tham gia một eyetracking study với 120 người dùng trên 6 website khác nhau. Câu hỏi: mọi người thực sự nhìn vào đâu và điều gì ảnh hưởng đến quyết định của họ?

## Social proof là gì và tại sao quan trọng?

Social proof bao gồm đánh giá khách hàng, số lượng người dùng, logo khách hàng nổi tiếng, chứng nhận, press mentions. Về cơ bản, bằng chứng rằng người khác đã tin tưởng bạn.

## Vị trí hiệu quả nhất theo eyetracking data

**1. Ngay dưới hero section** — hiệu quả nhất

95% người dùng scroll xuống sau khi đọc headline. Đặt 3 số liệu key ("2,500 khách hàng · 4.9⭐ · 98% hài lòng") hoặc logo của 5 công ty khách hàng lớn ngay đây. Người dùng nhìn vào đây trước khi đọc bất kỳ thứ gì khác.

**2. Cạnh form đăng ký/mua hàng** — quan trọng thứ 2

Đây là điểm quyết định. Khi người dùng đang suy nghĩ có nên nhập email/thanh toán không, review tích cực ngay bên cạnh giúp vượt qua do dự. Đặt 2–3 testimonial ngắn cạnh form.

**3. Sau khi mô tả sản phẩm/dịch vụ** — tốt để reinforce

Sau khi bạn giải thích tính năng và lợi ích, testimonial từ người đã dùng sẽ confirm những gì bạn vừa nói.

## Vị trí kém hiệu quả

**Footer**: Ít ai scroll xuống đây. Data cho thấy chưa đến 10% người dùng nhìn vào footer.

**Trang About riêng**: Chỉ những người đã gần tin tưởng mới vào trang About. Quá muộn để social proof có nhiều tác dụng.

## Chi tiết nhỏ tạo khác biệt lớn

Đánh giá có ảnh khuôn mặt thật (với sự cho phép) convert tốt hơn 35% so với đánh giá chỉ có tên. Đánh giá cụ thể ("Đặt lịch lúc 8h sáng, 8h30 được khám ngay, không chờ") tốt hơn chung chung ("Dịch vụ rất tốt").`
  },
  {
    slug: 'web-giao-hang-tich-hop',
    cat: 'E-Commerce',
    title: 'Tích hợp Giao Hàng Nhanh và GHN vào website: Hướng dẫn cho người không biết code',
    excerpt: 'Nhiều chủ shop hỏi mình cái này. Thực ra không phức tạp nếu dùng nền tảng đúng. Mình giải thích từng bước.',
    author: 'Bảo Tech',
    role: 'E-commerce Consultant',
    date: '7 tháng 3, 2025',
    read: '11 phút',
    img: IMG4,
    body: `Câu hỏi mình hay nhận: "Làm sao để website tự tính phí ship và kết nối với GHN/GHTK?" Thực ra có nhiều cách, tùy platform bạn dùng.

## Nếu dùng Haravan hoặc Sapo Web

Đây là trường hợp đơn giản nhất. Cả hai platform đều có tích hợp sẵn với GHN, GHTK, Viettel Post, J&T. Vào Settings → Vận chuyển → Kết nối tài khoản. Mất khoảng 15 phút.

## Nếu dùng WooCommerce (WordPress)

Cài plugin "WooCommerce Shipping GHN" hoặc "GHTK for WooCommerce". Miễn phí hoặc giá rất nhỏ. Sau đó:
1. Tạo tài khoản doanh nghiệp trên GHN/GHTK
2. Lấy API key từ dashboard của họ
3. Nhập vào plugin settings
4. Test với 1 đơn hàng thật

## Nếu dùng website custom

Cần developer. Nhưng GHN và GHTK đều có API documentation tiếng Việt rất tốt. Estimate của mình: 1–2 ngày developer.

## Những thứ hay bị quên

**Địa chỉ kho hàng**: Phí ship được tính từ kho của bạn đến địa chỉ khách. Phải cấu hình địa chỉ kho chính xác.

**Cân nặng sản phẩm**: Nếu không điền cân nặng cho từng sản phẩm, hệ thống không thể tính phí ship chính xác.

**Free ship threshold**: Nếu đơn trên X đồng thì miễn phí ship — cần cấu hình riêng, không phải mặc định.

**COD vs prepaid**: GHN cho phép thu hộ (COD). Nếu muốn offer COD cho khách, phải enable trong settings.

## Chi phí vận hành

GHN/GHTK tính phí theo đơn hàng, không phí tháng. Không có đơn = không có phí. Tích hợp API không tốn thêm gì.`
  },
]

export const categories = ['Tất Cả', 'Kinh Doanh', 'Thiết Kế', 'Marketing', 'SEO', 'Kỹ Thuật', 'Case Study', 'E-Commerce', 'Tư Vấn', 'Công Nghệ', 'Kinh Nghiệm']
