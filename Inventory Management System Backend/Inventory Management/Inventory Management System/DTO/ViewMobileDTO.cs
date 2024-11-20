namespace Inventory_Management_System.DTO
{
    public class ViewMobileDTO
    {
        public string MobileName { get; set; }
        public string MobileBrand { get; set; }
        public decimal MobilePrice { get; set; }
        public int MobileCount { get; set; }
        public IFormFile Media { get; set; }
        public string ImageUrlPath { get; set; }
    }

}
