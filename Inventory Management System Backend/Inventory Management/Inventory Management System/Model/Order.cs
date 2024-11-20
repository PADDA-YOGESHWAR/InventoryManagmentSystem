namespace Inventory_Management_System.Model
{
    public class Order
    {
        public int OrderId { get; set; }
        public int MobileId { get; set; }
        public string MobileName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime OrderDate { get; set; }
    }

}
