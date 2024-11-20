namespace Inventory_Management_System.DTO
{
    public class ViewOrdersDTO
    { 
        public int OrderId { get; set; }
        public string MobileName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
