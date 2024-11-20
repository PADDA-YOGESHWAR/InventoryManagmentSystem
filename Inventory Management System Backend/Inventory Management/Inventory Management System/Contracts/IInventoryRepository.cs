using Inventory_Management_System.DTO;
using Inventory_Management_System.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Inventory_Management_System.Contracts
{
    public interface IInventoryRepository
    {
        public IEnumerable<Mobile> GetAllMobiles();
        public bool AddStock(Mobile mobile);
        public Mobile GetMobileById(int mobileId);
        public bool UpdateMobile(Mobile mobile);
        public bool DeleteMobile(int mobileId);
        public string PlaceOrder(List<CartItem> cartItems);

        public List<ViewOrdersDTO> GetAllOrders();

    }
}
