using Inventory_Management_System.Contracts;
using Inventory_Management_System.DTO;
using Inventory_Management_System.Model;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _repository;
        public InventoryController(IInventoryRepository repository)
        {
            _repository = repository;
            
        }


        [HttpGet("GetAllStock")]
        public IActionResult GetAllMobiles()
        {
            var mobiles = _repository.GetAllMobiles();
            if (mobiles != null)
            {
                return Ok(mobiles);
            }
            return NotFound("No Mobiles Found");
        }

        [HttpDelete("DeleteMobile/{id}")]
        public IActionResult DeleteMobile(int id)
        {
            var deleteStatus = _repository.DeleteMobile(id);
            if(deleteStatus)
            {
                return Ok($"Mobile with id {id} is Deleted Successfully");
            }
            return BadRequest("Unable to delete due to some technical Error");
        }
       
        [HttpPost("UploadStock")]
        public IActionResult UploadMobiles([FromForm] ViewMobileDTO mobileDTO)
        {
            if (mobileDTO.Media == null || mobileDTO.Media.Length == 0)
            {
                return BadRequest("No image provided");
            }
            var customUploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            Directory.CreateDirectory(customUploadPath);
            var imagePath = Path.Combine(customUploadPath, mobileDTO.Media.FileName);
            Directory.CreateDirectory(Path.GetDirectoryName(imagePath));


            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                 mobileDTO.Media.CopyTo(stream);
            }
            var stock = new Mobile
            {
                MobileName = mobileDTO.MobileName,
                MobileBrand = mobileDTO.MobileBrand,
                MobilePrice = mobileDTO.MobilePrice,
                MobileCount = mobileDTO.MobileCount,
                ImageUrlPath = $"/uploads/{mobileDTO.Media.FileName}"
            };
            var status =  _repository.AddStock(stock);
            if(status)
            {
                return Ok(new { message = "Stock added successfully" });
            }
            return BadRequest("Stock not updated");
        }



        [HttpPost("placeOrder")]
        public IActionResult PlaceOrder([FromBody] List<CartItem> cartItems)
        {
            if (cartItems == null || cartItems.Count == 0)
            {
                return BadRequest("Cart is empty.");
            }
            var result = _repository.PlaceOrder(cartItems);
            return Ok(result);
        }

        [HttpGet("orders")]
        public IActionResult getOrders()
        {
            var result =  _repository.GetAllOrders();
            return Ok(result);
        }
    }
}
