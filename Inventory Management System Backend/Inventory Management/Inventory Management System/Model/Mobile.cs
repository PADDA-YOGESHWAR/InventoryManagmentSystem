using System.ComponentModel.DataAnnotations;

namespace Inventory_Management_System.Model
{
    public class Mobile
    {
        public int MobileId { get; set; }
        public string MobileName { get; set; }
        public string MobileBrand { get; set; }
        public string ImageUrlPath { get; set; }
        public decimal MobilePrice {  get; set; }
        public int MobileCount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
