using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiRedditDB.Data.Entities;

[Table("tblTopics")]
public class TopicEntity
{
    [Column("id")]
    public long Id { get; set; }
    [Column("name")]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    [Column("url_slug")]
    [StringLength(255)]
    public string UrlSlug { get; set; } = string.Empty;
    [Column("priority")]
    public int Priority { get; set; }
    [Column("image")]
    [StringLength(255)]
    public string? Image { get; set; }
    [Column("description")]
    public string? Desciption { get; set; }
    [Column("parent_id")]
    [ForeignKey(nameof(Parent))]
    public long ? ParentId { get; set; }
    public TopicEntity? Parent { get; set; }
    public ICollection<TopicEntity>? Children { get; set; }
    public ICollection<PostEntity>? Posts { get; set; }
}
