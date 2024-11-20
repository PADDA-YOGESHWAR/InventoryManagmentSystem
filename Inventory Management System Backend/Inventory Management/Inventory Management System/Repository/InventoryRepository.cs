using Inventory_Management_System.Contracts;
using Inventory_Management_System.Data;
using Inventory_Management_System.Model;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Inventory_Management_System.DTO;

namespace Inventory_Management_System.Repository
{
    public class InventoryRepository : IInventoryRepository
    {
        private InventoryDbContext _context;
        private readonly string _connectionString;
        private IDbConnection Connection => new SqlConnection(_connectionString);
        public InventoryRepository(InventoryDbContext Context, IConfiguration configuration)
        {
            _context = Context;
            _connectionString = configuration.GetConnectionString("InventoryDbString");
          
        }
        public IEnumerable<Mobile> GetAllMobiles()
        {
            using (var db = Connection)
            {
                return db.Query<Mobile>("GetAllMobiles", commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public bool AddStock(Mobile mobile)
        {
            mobile.MobileId = _context.mobiles.Count() == 0 ? 1000 : _context.mobiles.Max(x => x.MobileId) + 1;
            var ifExists = _context.mobiles.FirstOrDefault(x => x.MobileName == mobile.MobileName);
            if (ifExists == null)
            {

                _context.mobiles.Add(mobile);
                _context.SaveChanges();
                return true;
            }
            ifExists.MobileCount += mobile.MobileCount;
            _context.SaveChanges();
            return true;
            
        }
        public Mobile GetMobileById(int mobileId)
        {
            var requiredmobile = (from m in _context.mobiles
                                     where m.MobileId == mobileId select m).FirstOrDefault();
            if(requiredmobile != null)
            {
                return requiredmobile;
            }
            return null;
        }

        public bool UpdateMobile(Mobile mobile)
        {
            if (mobile == null)
            {
                return false;
            }
            _context.mobiles.Update(mobile);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteMobile(int mobileId)
        {
            var mobile = GetMobileById(mobileId);
            if (mobile != null)
            {
                _context.mobiles.Remove(mobile);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public string PlaceOrder(List<CartItem> cartItems)
        {
            foreach (var item in cartItems)
            {
                var mobile =  GetMobileById(item.MobileId);

                if (mobile == null)
                {
                    return $"Mobile with ID {item.MobileId} not found.";
                }
                mobile.MobileCount -= item.Quantity;
                UpdateMobile(mobile);
                var order = new Order
                {
                    MobileId = mobile.MobileId,
                    MobileName = mobile.MobileName,
                    Quantity = item.Quantity,
                    Price = mobile.MobilePrice * item.Quantity,
                    OrderDate = DateTime.Now
                };
                _context.Orders.Add(order);
            }
            _context.SaveChanges();
            return "Order placed successfully.";
        }

        public List<ViewOrdersDTO> GetAllOrders()
        {
            var ordersList = _context.Orders.ToList();
            List<ViewOrdersDTO> orders = new List<ViewOrdersDTO>();
            foreach(var order in ordersList)
            {
                orders.Add(new ViewOrdersDTO
                {
                    OrderId = order.OrderId,
                    MobileName = order.MobileName,
                    Price= order.Price,
                    Quantity= order.Quantity,
                    OrderDate = order.OrderDate,
                });
            }
            return orders;
        }
    }
}
